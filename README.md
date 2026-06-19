# Nulien Transportation Website

Modern multi-page marketing website for **NULIEN TRANSPORTATION LLC** built with Next.js.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (live chat + dispatch inbox)
- Vercel deployment

## Main Pages

- Home
- Services
- Fleet
- Quote (`/reservation`)
- **Live chat** (`/chat`)
- About
- Contact
- FAQ
- Feedback
- Privacy Policy
- Terms & Conditions
- Carrier Onboarding
- **Admin inbox** (`/admin/login` — not linked in public nav)

## Run Locally

```bash
npm install
cp .env.example .env.local
# Fill in Supabase + admin password (see Live chat setup below)
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Live chat setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the full script in [`supabase/schema.sql`](supabase/schema.sql).
3. In **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server only — never expose in the browser)
4. Set in `.env.local` (and Vercel → Environment Variables):
   - `ADMIN_PASSWORD` — password for `/admin/login`
   - `ADMIN_SESSION_SECRET` — long random string for signed admin cookies
5. Restart `npm run dev`.
6. **Email replies:** Sign up at [resend.com](https://resend.com), create an API key → `RESEND_API_KEY`. Verify `nulientransportation.com` in Resend, then set `CHAT_EMAIL_FROM=Nulien Transportation <dispatch@nulientransportation.com>`. Until the domain is verified, use `onboarding@resend.dev` and add test recipient emails in Resend.

**Customer:** `/chat` — start a thread; dispatch replies appear in chat and are emailed.  
**Owner:** `/admin/login` → inbox → open a thread → reply.

## Deployment Notes

- Domain: `nulientransportation.com`
- DNS and email routing managed in Cloudflare
- Site deployed via Vercel
- Add all env vars from `.env.example` in Vercel before chat will work in production

## Contact Inboxes

- `info@nulientransportation.com`
- `natanael92@nulientransportation.com`

Both route to: `nulientransportationllc@gmail.com` (optional backup alongside in-app chat)
