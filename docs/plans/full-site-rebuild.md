# Eye Q Hawaii — Full Site Rebuild (Astro, multi-page, immersive)

**Goal:** Rebuild the single-page React site as a pre-rendered, multi-page Astro site engineered
for SEO / GEO / AEO, with an elevated, immersive experience positioning Eye Q Hawaii as a
best-in-class optometry practice. Reuse the existing design system (Fraunces + Outfit,
ocean/sand palette) and React for interactive islands.

## Source of truth — facts
- Dr. Caron Fernandez, O.D. — BS Biology, Pacific University (OR); New England College of
  Optometry (NECO), Boston.
- Career: Costco (Kailua-Kona) → Ludwig Ophthalmology (Hilo) → opened own practice **Sept 1, 2021**.
- **Optometrist since 2008; independent practice since 2021.** (Resolves prior timeline conflict.)
- Personal: family, travel, pickleball, avid orchid lover.
- Location: Hilo, Big Island, HI. Phone (808) 464-4468. Mon–Fri 8am–5pm.
- A Member of Vision Source (logo near top — already added).

## Architecture
- **Astro 5** (static output, pre-rendered HTML) + `@astrojs/react` (islands) +
  `@astrojs/tailwind` (reuse tailwind.config.js) + `@astrojs/sitemap`.
- `src/layouts/BaseLayout.astro` — `<head>`, SEO meta, Open Graph/Twitter, canonical, JSON-LD slot.
- `src/components/*.astro` — Nav, Footer, Section primitives (static).
- `src/components/react/*.jsx` — interactive islands: BookingModal, MobileMenu, ServiceCard
  accordion, VisionTest suite, FrameTryOn.
- `src/data/*.js` — services, lessons, faqs, brands, doctor, site (NAP/hours).
- `src/styles/global.css` — design tokens (ported from src/index.css).

## Pages (URLs)
- `/` home
- `/about` Dr. Fernandez
- `/services` overview + 8 service detail pages:
  `/services/eye-exams`, `/glasses-contacts`, `/pediatric-eye-care`,
  `/diabetic-eye-exams`, `/glaucoma-cataract`, `/dry-eye-treatment`,
  `/emergency-eye-care`, `/lasik-surgery-referrals`
- `/eyewear` boutique + brands
- `/smart-glasses` Oakley Meta
- `/vision-test` ⭐ immersive online vision-screening suite (the differentiator)
- `/resources` education hub + articles (repurpose the 50+ topics in the growth-strategy doc)
- `/contact` map, hours, booking
- `/faq` FAQ with FAQPage schema

## SEO / GEO / AEO
- Real pre-rendered HTML per page (fixes AI-crawler invisibility).
- JSON-LD: `Optometrist`/`LocalBusiness` (NAP, geo, hours, sameAs), `Service` per service page,
  `FAQPage`, `BreadcrumbList`, `Physician`/`Person` for Dr. Fernandez.
- Per-service pages target "[service] Hilo / Big Island".
- sitemap.xml, robots.txt, canonical, OG/Twitter cards, fast + a11y.

## Immersive: /vision-test (screening, NOT diagnosis)
- Screen-size calibration (credit-card method).
- Modules: visual acuity (Landolt C / Snellen), astigmatism starburst, color vision (Ishihara),
  Amsler grid, contrast sensitivity, near vision.
- Clear medical disclaimers; ends in a "Book with Dr. Fernandez" CTA. Shareable (feeds social plan).
- Phase 2 option: webcam AR frame try-on (Jeeliz/MediaPipe).

## Build phases
1. **Foundation** (this session): Astro scaffold, design tokens, BaseLayout, Nav, Footer, data
   files, home page, SEO/schema plumbing. Verify build + render.
2. **Pages** (sub-agents, parallel): 8 service pages, about, eyewear, smart-glasses, contact, faq,
   resources — each with schema.
3. **Immersive**: /vision-test suite. Optional AR try-on.
4. **Polish**: animations, a11y pass, Lighthouse, deploy config (vercel static).
