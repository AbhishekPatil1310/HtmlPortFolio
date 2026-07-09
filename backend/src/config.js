import "dotenv/config";

const NODE_ENV = process.env.NODE_ENV ?? "development";

function parseNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseOrigins(raw) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  nodeEnv: NODE_ENV,
  isProd: NODE_ENV === "production",
  port: parseNumber(process.env.PORT, 4000),
  trustProxy: process.env.TRUST_PROXY ?? "1",
  logLevel: process.env.LOG_LEVEL ?? "info",
  corsOrigins: parseOrigins(process.env.CORS_ORIGINS),
  rateLimitWindowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  rateLimitMax: parseNumber(process.env.RATE_LIMIT_MAX, 20),
  bodyLimit: process.env.BODY_LIMIT ?? "32kb",
  brevoApiKey: required("BREVO_API_KEY"),
  brevoApiUrl: process.env.BREVO_API_URL ?? "https://api.brevo.com/v3/smtp/email",
  brevoFromEmail: required("BREVO_FROM_EMAIL"),
  brevoFromName: process.env.BREVO_FROM_NAME ?? "Portfolio Contact",
  brevoToEmail: required("BREVO_TO_EMAIL"),
  brevoSubjectPrefix: process.env.BREVO_SUBJECT_PREFIX ?? "[Portfolio Contact]",
  brevoTimeoutMs: parseNumber(process.env.BREVO_TIMEOUT_MS, 8_000),
  brevoRetryCount: parseNumber(process.env.BREVO_RETRY_COUNT, 2),
  visitRateLimitWindowMs: parseNumber(process.env.VISIT_RATE_LIMIT_WINDOW_MS, 60_000),
  visitRateLimitMax: parseNumber(process.env.VISIT_RATE_LIMIT_MAX, 60),
  visitDedupWindowMs: parseNumber(process.env.VISIT_DEDUP_WINDOW_MS, 6 * 60 * 60 * 1000),
  telegramEnabled: process.env.TELEGRAM_ENABLED === "true",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? "",
  telegramApiBaseUrl: process.env.TELEGRAM_API_BASE_URL ?? "https://api.telegram.org",
  telegramTimeoutMs: parseNumber(process.env.TELEGRAM_TIMEOUT_MS, 6_000),
  telegramRetryCount: parseNumber(process.env.TELEGRAM_RETRY_COUNT, 2),
  ragServiceUrl: process.env.RAG_SERVICE_URL ?? "http://127.0.0.1:8000",
  ragQueryPath: process.env.RAG_QUERY_PATH ?? "/query",
  ragTimeoutMs: parseNumber(process.env.RAG_TIMEOUT_MS, 20_000),
  ragRetryCount: parseNumber(process.env.RAG_RETRY_COUNT, 1),
  chatRateLimitWindowMs: parseNumber(process.env.CHAT_RATE_LIMIT_WINDOW_MS, 60_000),
  chatRateLimitMax: parseNumber(process.env.CHAT_RATE_LIMIT_MAX, 20),
};
