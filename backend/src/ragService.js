import { setTimeout as sleep } from "node:timers/promises";
import { config } from "./config.js";

class RagServiceError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "RagServiceError";
    this.status = options.status;
    this.code = options.code;
  }
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function askRagService({ question, topK }) {
  const url = `${config.ragServiceUrl}${config.ragQueryPath}`;
  const body = { question, top_k: topK };

  let lastError;
  const maxAttempts = Math.max(1, config.ragRetryCount + 1);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
        config.ragTimeoutMs
      );

      if (response.ok) {
        return await response.json();
      }

      const responseText = await response.text().catch(() => "");
      const isRetriable = response.status >= 500 || response.status === 429;
      const error = new RagServiceError(
        `RAG service request failed: status=${response.status} body=${responseText}`,
        { status: response.status, code: "rag_request_failed" }
      );

      if (!isRetriable || attempt >= maxAttempts) {
        throw error;
      }

      lastError = error;
    } catch (error) {
      if (error.name === "AbortError") {
        lastError = new RagServiceError("RAG service request timed out", {
          code: "rag_timeout",
        });
      } else {
        lastError = error;
      }

      if (attempt >= maxAttempts) {
        throw lastError;
      }
    }

    await sleep(Math.min(500 * attempt, 2_000));
  }

  throw lastError;
}

export { RagServiceError };
