import { config } from "./config.js";

class BrevoProviderError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "BrevoProviderError";
    this.status = options.status;
    this.code = options.code;
    this.responseBody = options.responseBody;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function makeHtmlBody({ name, email, message, ip, userAgent }) {
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeIp = escapeHtml(ip || "unknown");
  const safeUserAgent = escapeHtml(userAgent || "unknown");
  return `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>IP:</strong> ${safeIp}</p>
    <p><strong>User-Agent:</strong> ${safeUserAgent}</p>
    <hr/>
    <p>${safeMessage}</p>
  `;
}

function makeTextBody({ name, email, message, ip, userAgent }) {
  return [
    "New Contact Message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `IP: ${ip || "unknown"}`,
    `User-Agent: ${userAgent || "unknown"}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

function buildPayload(contactInput) {
  return {
    sender: {
      email: config.brevoFromEmail,
      name: config.brevoFromName,
    },
    to: [{ email: config.brevoToEmail }],
    replyTo: {
      email: contactInput.email,
      name: contactInput.name,
    },
    subject: `${config.brevoSubjectPrefix} ${contactInput.name}`,
    htmlContent: makeHtmlBody(contactInput),
    textContent: makeTextBody(contactInput),
  };
}

export async function sendContactEmail(contactInput) {
  const payload = buildPayload(contactInput);

  let lastError;
  const maxAttempts = Math.max(1, config.brevoRetryCount + 1);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchWithTimeout(
        config.brevoApiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": config.brevoApiKey,
          },
          body: JSON.stringify(payload),
        },
        config.brevoTimeoutMs
      );

      if (response.ok) {
        return;
      }

      const responseText = await response.text();
      const isRetriable = response.status >= 500 || response.status === 429;
      const error = new BrevoProviderError(
        `Brevo request failed: status=${response.status} body=${responseText}`,
        {
          status: response.status,
          code: "brevo_request_failed",
          responseBody: responseText,
        }
      );

      if (!isRetriable || attempt >= maxAttempts) {
        throw error;
      }

      lastError = error;
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts) {
        throw lastError;
      }
    }

    const retryDelayMs = Math.min(1_000 * 2 ** (attempt - 1), 4_000);
    await wait(retryDelayMs);
  }

  throw lastError;
}

export { BrevoProviderError };
