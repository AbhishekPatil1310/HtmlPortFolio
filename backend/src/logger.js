import pino from "pino";
import { randomUUID } from "node:crypto";
import { config } from "./config.js";

export const logger = pino({
  level: config.logLevel,
  base: {
    service: "portfolio-mail-backend",
    env: config.nodeEnv,
  },
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie"],
    remove: true,
  },
});

export function getRequestId(headerRequestId) {
  return headerRequestId || randomUUID();
}

