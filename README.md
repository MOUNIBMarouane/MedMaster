# MedMaster — Landing Page & Waiting List

Landing page for MedMaster, the first native mobile app for medical QCM exam preparation in Morocco.

Built with **Next.js 14**, **Tailwind CSS**, and **Supabase**.

---

## Quick Start

### 1. Clone & install

```bash
git clone <your-repo-url>
cd medmaster-landing
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migration.sql`
3. Go to **Settings → API** and copy your project URL and anon key

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
medmaster/
├── app/
│   ├── api/
│   │   ├── signup/route.ts    # POST — form submission
│   │   └── count/route.ts     # GET — signup counter
│   ├── globals.css            # Tailwind + custom styles
│   ├── layout.tsx             # Root layout, SEO meta
│   └── page.tsx               # Main page
├── components/
│   ├── Hero.tsx               # Hero with phone mockup
│   ├── Problem.tsx            # Pain points section
│   ├── Pillars.tsx            # 3 value prop pillars
│   ├── HowItWorks.tsx         # 3-step explainer
│   ├── SignupForm.tsx         # Form + counter + success
│   └── Footer.tsx             # Footer
├── lib/
│   ├── supabase.ts            # Supabase client
│   └── hooks.ts               # useScrollReveal, useCountUp
├── public/
│   └── favicon.svg            # Favicon
├── supabase/
│   └── migration.sql          # Database schema
└── .env.local.example         # Environment template
```

## Deployment

Optimized for **Vercel**:

```bash
npm run build
# or push to GitHub and connect to Vercel
```

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in your Vercel project settings.

---

## Customization

- **Colors**: Edit `tailwind.config.js` → `theme.extend.colors.brand`
- **Copy**: All French text is directly in components — no i18n layer
- **Cities**: Update the `VILLES` array in `components/SignupForm.tsx`
- **OG Image**: Replace `public/og-image.png` with your design (1200×630px)

---

Built by [MindOn Tech](https://mindontech.com)
