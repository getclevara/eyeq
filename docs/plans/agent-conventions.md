# Agent build conventions — Eye Q Hawaii (Astro 5 static site)

Read this fully before creating any page. Match these conventions exactly.

## Stack & commands
- Astro 5 static (`output: 'static'`), Tailwind 3.4, React islands via `@astrojs/react`,
  icons via `astro-icon` (Lucide set).
- Validate your work with `npm run build` (must pass). A dev server may be running — do not start another.
- Only CREATE your assigned page files. Do NOT modify shared files (BaseLayout, Nav, Footer,
  data files, global.css, tailwind.config, astro.config). If you think a shared change is needed,
  note it in your final report instead of making it.

## Layout — every page uses BaseLayout
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'; // adjust ../ depth per folder
import { Icon } from 'astro-icon/components';
---
<BaseLayout
  title="Page Title (no site name — layout appends '| Eye Q Hawaii')"
  description="<=155 char meta description, local + keyword rich"
  jsonLd={[ /* array of schema.org objects, optional */ ]}
  heroOverlay={false}  /* true ONLY if the page opens with a full-bleed dark hero behind the nav */
>
  <!-- page sections -->
</BaseLayout>
```
The layout already injects site-wide LocalBusiness schema, Nav, Footer, fonts, OG/canonical.
Nav is `fixed`; on pages without `heroOverlay`, ADD top padding to your first section so content
clears the nav (e.g. a `pt-32` hero/header block). On `heroOverlay` pages the hero is full-screen
and sits under the nav by design.

## Icons
`import { Icon } from 'astro-icon/components';` then `<Icon name="lucide:eye" class="w-5 h-5" />`.
Use any Lucide name (kebab-case). No React needed for icons.

## Data (import, never hardcode)
- `../data/site.js` → `{ site, nav }` — NAP, phone (`site.phoneHref`, `site.phone`), hours, email, social.
- `../data/services.js` → `{ services, getService }` — 8 services with `slug,title,shortTitle,icon,duration,forWho,summary,description,details[],image,seoTitle,seoDescription,faqs[]`.
- `../data/doctor.js` → `{ doctor }` — name, credential, photo, education[], specialties[], bio[] (3 paragraphs).
- `../data/content.js` → `{ brands, lessons, faqs }`.

## Design tokens / utility classes (already defined in global.css + tailwind.config)
- Fonts: headings use `font-display` (Fraunces); body is Outfit by default.
- Colors: `ocean-50..900` (primary blue), `sand-50..500` (warm accent), slate for text.
- Components: `.btn-primary`, `.btn-secondary`, `.container-width` (max-w-7xl + padding),
  `.section-padding` (py-20 lg:py-28), `.eyebrow` (uppercase ocean label), `.glass-panel`,
  `.glass-panel-dark`, `.reveal` (add to elements for scroll-fade-in; observer is global).
- Booking CTA → link to `/contact`. Phone → `site.phoneHref`.
- Rounded, airy, premium. Generous whitespace. Asymmetry/overlap welcome. Respect reduced-motion
  (handled by CSS for `.reveal`). Ensure WCAG AA contrast and real `alt` text.

## SEO/GEO/AEO requirements per page
- One clear `<h1>`. Logical heading hierarchy.
- Local keywords naturally ("Hilo", "Big Island", "Hawaii").
- If the page has FAQs, render them AND pass a `FAQPage` JSON-LD via `jsonLd`.
- Service pages: add `Service` + `FAQPage` + `BreadcrumbList` schema.
- Use real, crawlable text (not images of text).

## Images
Existing local: `/images/dr-fernandez.jpg`, `/images/oakley-meta.png`,
`/images/vision-source-member.png`. Service/lifestyle images: use the Unsplash URLs already in
the data (`service.image`) or tasteful Unsplash `https://images.unsplash.com/...?w=1200&q=80` links.
Always set width/height-agnostic `object-cover` containers + `alt`.

## JSON-LD helper pattern
```js
const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};
```
