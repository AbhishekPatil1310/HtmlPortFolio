# Portfolio Mail Backend

Production-ready API for contact form submissions, integrated with Brevo transactional email.

## Features

- Express API with structured logs (`pino`)
- Security middleware (`helmet`, CORS policy, disabled x-powered-by)
- Per-IP rate limiting on `/api/contact`
- Strict payload validation with `zod`
- Brevo client with timeout + retry for transient failures
- Health endpoints: `/health`, `/ready`
- Graceful shutdown handling (`SIGINT`, `SIGTERM`)

## Quick Start

1. Copy `.env.example` to `.env`
2. Fill required Brevo variables
3. Install dependencies:

```bash
npm install
```

4. Start dev server:

```bash
npm run dev
```

Server defaults to `http://localhost:4000`.

## API

### `POST /api/contact`

Body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message",
  "company": ""
}
```

Response:

- `202` accepted and email queued/sent
- `400` validation errors
- `429` rate limited
- `500` server failure

`company` is a honeypot field and should stay empty in normal UI.
