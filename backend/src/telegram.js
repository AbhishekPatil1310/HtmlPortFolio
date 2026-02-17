import { setTimeout as sleep } from "node:timers/promises";
import { config } from "./config.js";

function formatMessage(payload) {
  const indiaTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "long",
    hour12: true,
  }).format(new Date());

  const lines = [
    "PORTFOLIO VISITOR ALERT",
    "------------------------",
    `Time (India): ${indiaTime}`,
    `Path: ${payload.path || "n/a"}`,
    `Referrer: ${payload.referrer || "direct"}`,
    "",
    "Visitor Details",
    `Visitor ID: ${payload.visitorId || "n/a"}`,
    `IP Address: ${payload.ip || "n/a"}`,
    `Locale: ${payload.locale || "n/a"}`,
    `Browser Timezone: ${payload.timezone || "n/a"}`,
    `Screen: ${payload.screen || "n/a"}`,
    "",
    "Client",
    `${payload.userAgent || "n/a"}`,
  ];

  return lines.join("\n");
}

async function sendWithRetry(url, body, timeoutMs, retryCount) {
  let attempt = 0;
  let lastError;

  while (attempt <= retryCount) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (response.ok) {
        return;
      }

      if (response.status >= 500 || response.status === 429) {
        lastError = new Error(`Telegram temporary error: ${response.status}`);
      } else {
        const responseBody = await response.text().catch(() => "");
        throw new Error(`Telegram request failed: ${response.status} ${responseBody}`);
      }
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }

    attempt += 1;
    if (attempt <= retryCount) {
      await sleep(250 * attempt);
    }
  }

  throw lastError ?? new Error("Telegram request failed");
}

export async function sendVisitNotification(payload) {
  if (!config.telegramEnabled) {
    return { sent: false, reason: "disabled" };
  }

  if (!config.telegramBotToken || !config.telegramChatId) {
    throw new Error("Telegram is enabled but TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing");
  }

  const url = `${config.telegramApiBaseUrl}/bot${config.telegramBotToken}/sendMessage`;
  const body = {
    chat_id: config.telegramChatId,
    text: formatMessage(payload),
    disable_web_page_preview: true,
  };

  await sendWithRetry(url, body, config.telegramTimeoutMs, config.telegramRetryCount);
  return { sent: true };
}
