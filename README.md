# QUNARA

Qunara is an editorial knowledge platform for exploring quantum physics, Buddhist philosophy, consciousness, philosophy, and human experience with clear epistemic boundaries.

## Installation

Requirements: Node.js 18.17 or newer and npm 9 or newer.

```bash
npm install
```

## Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run quality checks with:

```bash
npm run lint
npm run build
```

## Architecture

- `src/app` — App Router pages, metadata, and route-specific client components
- `src/components` — shared layout, cards, artwork, motion, search, and forms
- `src/lib/data.ts` — typed editorial seed data
- `src/lib/supabase` — optional Supabase browser client

The interface uses original inline SVG artwork, so no remote image host or stock photography is required.

## Supabase setup

Supabase is optional. The application works without environment variables. To connect a project, create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The helper in `src/lib/supabase/client.ts` returns `null` when configuration is absent. This lets features adopt Supabase incrementally without breaking static content. For production, enable Row Level Security on every public table and create policies specific to authenticated user actions.

Suggested future tables: `profiles`, `resources`, `collections`, `saved_resources`, `newsletter_subscribers`, and `contact_messages`.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import it into Vercel; the framework preset will detect Next.js.
3. Add the optional Supabase variables under Project Settings → Environment Variables.
4. Deploy. Vercel runs `npm run build` automatically.

The app is SEO-ready through Next.js metadata, semantic landmarks, accessible labels, and server-rendered pages. Update `metadataBase` in `src/app/layout.tsx` if using a domain other than `qunara.org`.
