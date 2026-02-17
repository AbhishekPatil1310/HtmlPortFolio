# Pixel Perfect Portfolio

A modern, production-ready developer portfolio built with React, TypeScript, Vite, and Tailwind CSS.

This project showcases:
- A polished single-page portfolio experience
- A dedicated `Services & Pricing` page
- A functional contact form integrated with a backend email API
- Responsive UI, motion-driven interactions, and reusable component architecture

## Live Sections

- Hero
- Tech Stack
- Experience
- Projects
- Contact
- Education
- Services & Pricing (`/services`)

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router DOM
- TanStack Query
- shadcn/ui + Radix UI primitives
- Lucide React icons
- Vitest + Testing Library
- ESLint

## Project Highlights

- Clean section-based homepage with smooth anchor navigation
- Route-based services page aligned with the main design system
- Hash-aware navigation behavior (e.g. `/services` -> `/#contact`)
- Contact form with loading state, success/error feedback, and honeypot support
- Glassmorphism-inspired UI system using shared CSS tokens and utility classes
- Scalable folder structure with isolated reusable components

## Project Structure

```text
pixel-perfect-portfolio/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ Navbar.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Contact.tsx
│  │  └─ ...
│  ├─ pages/
│  │  ├─ Index.tsx
│  │  ├─ Services.tsx
│  │  └─ NotFound.tsx
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ vite.config.ts
├─ tailwind.config.ts
└─ package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

By default, the app runs at `http://localhost:8080`.

## Environment Variables

Create a `.env` file in `pixel-perfect-portfolio` if needed.

### Frontend variables

- `VITE_API_PROXY_TARGET`  
  Used by Vite dev proxy for `/api` requests.  
  Default: `http://localhost:4000`

- `VITE_BREVO_FORM_ENDPOINT`  
  Optional direct contact endpoint override.  
  Default in code: `/api/contact`

- `VITE_VISIT_TRACK_ENDPOINT`  
  Optional visitor tracking endpoint override.  
  Default in code: `/api/visits`

Example:

```env
VITE_API_PROXY_TARGET=http://localhost:4000
VITE_BREVO_FORM_ENDPOINT=/api/contact
VITE_VISIT_TRACK_ENDPOINT=/api/visits
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Create production build
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Backend Integration

The contact form expects a backend endpoint at `/api/contact`.

In this workspace, a separate backend service is available under:

`../backend`

Ensure backend environment variables (Brevo API key, sender, recipient) are configured correctly for email delivery.

## Deployment Notes

- Build command: `npm run build`
- Output directory: `dist`
- For static hosting, configure SPA fallback to `index.html`
- Ensure `/api` requests are routed to your backend in production
- Verify contact form endpoint and CORS policy before release

## Quality Checklist

- Responsive layout on mobile, tablet, desktop
- No TypeScript or build errors
- Route navigation works for `/` and `/services`
- Contact form submits successfully and returns expected status
- Lighthouse/performance checks before production launch

## License

This project is for personal portfolio use. Add a custom license if you plan to distribute or open source it.
