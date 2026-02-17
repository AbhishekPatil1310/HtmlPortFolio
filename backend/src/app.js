import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import { createHash } from "node:crypto";
import { config } from "./config.js";
import { contactSchema, visitSchema } from "./validation.js";
import { BrevoProviderError, sendContactEmail } from "./brevo.js";
import { getRequestId, logger } from "./logger.js";
import { sendVisitNotification } from "./telegram.js";

export const app = express();

app.set("trust proxy", config.trustProxy);
app.disable("x-powered-by");

app.use(
  pinoHttp({
    logger,
    genReqId: (req) => getRequestId(req.headers["x-request-id"]),
    customLogLevel: (_req, res, error) => {
      if (error || res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.corsOrigins.length === 0) {
        callback(null, true);
        return;
      }

      if (config.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["POST", "GET", "OPTIONS"],
  })
);

app.use(express.json({ limit: config.bodyLimit }));
app.use(express.urlencoded({ extended: false, limit: config.bodyLimit }));

const contactLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many requests. Please try again shortly." },
});

const visitLimiter = rateLimit({
  windowMs: config.visitRateLimitWindowMs,
  max: config.visitRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many visit notifications. Please try again shortly." },
});

const visitDedup = new Map();
const DEDUP_SWEEP_INTERVAL_MS = 10 * 60 * 1000;

function buildVisitDedupKey(req, visitorId, path) {
  const ua = req.get("user-agent") ?? "";
  const source = `${req.ip}|${ua}|${visitorId}|${path}`;
  return createHash("sha256").update(source).digest("hex");
}

function isDuplicateVisit(key) {
  const now = Date.now();
  const expiresAt = visitDedup.get(key);

  if (expiresAt && expiresAt > now) {
    return true;
  }

  visitDedup.set(key, now + config.visitDedupWindowMs);
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, expiresAt] of visitDedup.entries()) {
    if (expiresAt <= now) {
      visitDedup.delete(key);
    }
  }
}, DEDUP_SWEEP_INTERVAL_MS).unref();

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, status: "healthy" });
});

app.get("/ready", (_req, res) => {
  res.status(200).json({ ok: true, status: "ready" });
});

app.post("/api/contact", contactLimiter, async (req, res, next) => {
  try {
    const parseResult = contactSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        ok: false,
        message: "Invalid form payload",
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parseResult.data;

    // Honeypot field: silently accept probable bot submissions.
    if (data.company) {
      req.log.warn({ ip: req.ip }, "Bot-like submission detected");
      res.status(202).json({ ok: true, message: "Message received." });
      return;
    }

    await sendContactEmail({
      ...data,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });

    res.status(202).json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/visits", visitLimiter, async (req, res, next) => {
  try {
    const parseResult = visitSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        ok: false,
        message: "Invalid visit payload",
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parseResult.data;
    const dedupKey = buildVisitDedupKey(req, data.visitorId, data.path);

    if (isDuplicateVisit(dedupKey)) {
      res.status(202).json({ ok: true, message: "Visit already tracked." });
      return;
    }

    await sendVisitNotification({
      ...data,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });

    res.status(202).json({ ok: true, message: "Visit tracked." });
  } catch (error) {
    next(error);
  }
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.use((error, req, res, _next) => {
  if (error instanceof BrevoProviderError) {
    req.log.error(
      { status: error.status, code: error.code, provider: "brevo" },
      "Email provider request failed"
    );
    res.status(502).json({
      ok: false,
      message: "Email service is temporarily unavailable. Please try WhatsApp or email.",
    });
    return;
  }

  req.log.error({ err: error }, "Request failed");
  res.status(500).json({
    ok: false,
    message: "Internal server error",
  });
});
