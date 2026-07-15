# Surachana English School website

A dedicated React and Vite website for Surachana English School. The public site works with bundled content and can optionally load managed content and receive enquiries through an API.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The development site uses `http://127.0.0.1:4000` when `VITE_API_BASE_URL` is not configured. If no backend is running, bundled school data is used automatically.

## Quality checks and production build

```bash
npm run typecheck
npm run build
```

`npm run build` type-checks the project before creating `dist/`. The static production build does not contact a backend unless `VITE_API_BASE_URL` is configured at build time.

## Backend contract

When enabled, the website expects:

- `GET /api/site-data`
- `POST /api/inquiries`

Set `VITE_DISABLE_BACKEND=true` to force bundled content. Never use a localhost API URL in a public production build.

## Content checklist before launch

- Confirm the school address, map, phone, email, hours, and social links.
- Replace generic leadership and faculty entries with approved information.
- Verify admissions dates, eligibility, documents, and grade availability.
- Use consented, descriptive school photography; higher-resolution WebP or AVIF originals are recommended.
- Configure a working enquiry API or clearly direct visitors to phone/email instead.
- Treat `/admin` as a UI preview until authentication, authorization, persistence, and a real admin API are implemented.

The admin preview is available during local development. Production builds keep it disabled unless `VITE_ENABLE_ADMIN=true` is deliberately provided; that flag exposes only the preview and does not add security or persistence.
