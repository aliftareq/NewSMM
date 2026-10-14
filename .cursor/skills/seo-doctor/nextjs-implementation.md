# Next.js App Router — SEO implementation map

Use when **fixing** issues (especially **`seo-doctor fix`**). Discover `app/` vs `src/app/` and follow the clone’s folder conventions (e.g. `src/components/shared/`, feature modules). Workflow: [fix-workflow.md](fix-workflow.md).

## Fix mode patterns

### Site URL and canonical base

- Add env-driven site URL (e.g. `NEXT_PUBLIC_SITE_URL` in `.env.example`) and read it from `src/config/site.ts` or `src/lib/seo/site.ts`.
- Use the same base for `metadata.alternates.canonical`, `sitemap.ts` absolute URLs, and `robots.ts` sitemap reference.
- Do not hardcode production domains in source; use env with a sensible dev default only in examples.

### Missing marketing / legal routes

When handover item 3 fails, scaffold minimal routes (e.g. `about`, `contact`, `terms`, `privacy`) with:

- `page.tsx` + one H1
- Route-level `metadata` or `generateMetadata` (unique title/description placeholders from product context when available)
- Link from a shared header/footer once those exist

Place routes per project structure (`app/(marketing)/...` or `src/app/...`).

### Shared SEO utilities

- `components/shared/JsonLd.tsx` — server component accepting a serializable schema object; render `<script type="application/ld+json">`.
- Optional `src/lib/seo/metadata.ts` — helpers for default title template, canonical, and Open Graph.
- Homepage: Organization + WebSite + WebPage JSON-LD when appropriate; add LocalBusiness / AggregateRating only when real data exists on the page.

### Indexation files

- `sitemap.ts` — list only indexable routes; update when adding marketing pages.
- `robots.ts` — allow public paths; point to sitemap URL using site base from config.
- `not-found.tsx` at app root for proper 404.

### Internal linking

- Shared layout footer/nav linking to About, Contact, Terms, Privacy, and key hubs using the project `LinkTo` (or equivalent) wrapper.

## Metadata

| Need | Where |
|------|--------|
| Site-wide defaults | Root `layout.tsx` — `export const metadata: Metadata` |
| Per-route title/description | `page.tsx` or segment `layout.tsx` — `export const metadata` or `export async function generateMetadata()` |
| Canonical | `metadata.alternates.canonical` |
| hreflang | `metadata.alternates.languages` — include **current locale** explicitly |
| Robots per route | `metadata.robots` |
| Open Graph / Twitter | `metadata.openGraph`, `metadata.twitter` |

Prefer server `generateMetadata` for dynamic routes (blog slug, service id).

## Sitemap and robots

| File | Purpose |
|------|---------|
| `sitemap.ts` | Export default function returning `MetadataRoute.Sitemap` — only indexable canonical URLs |
| `robots.ts` | Export default function returning `MetadataRoute.Robots` — allow/disallow + `sitemap` URL |

Place under the same app root as `layout.tsx` (`app/` or `src/app/`).

## Structured data (JSON-LD)

- Prefer **server-rendered** `<script type="application/ld+json">` in a layout/page or shared component (e.g. `components/shared/JsonLd.tsx`).
- Client-only injection may not appear in static fetches — validate after deploy with Rich Results Test or browser DOM query.
- Match schema to visible content; never fabricate ratings or addresses.

## Redirects and canonical host

- **Permanent redirects:** `next.config.ts` `redirects()` for HTTP→HTTPS, www policy, legacy paths.
- **Middleware:** optional host normalization; keep rules aligned with canonical tags.

## Routing and indexation

- `not-found.tsx` for proper 404 status
- Avoid `noindex` on production money pages unless intentional
- Route groups `(marketing)` do not affect URLs — enumerate real paths

## Performance (CWV)

- `next/image` for images; explicit sizes where needed
- Font optimization (`next/font`)
- Limit client JS on LCP routes; code-split heavy components
- Static or ISR for marketing pages when appropriate

## Internal linking

- Use the project’s link wrapper (e.g. `LinkTo`) for internal URLs
- Ensure nav, footer, and hubs link to services, categories, blog

## CMS / editable SEO

When a CMS or admin exists:

- Map title, description, canonical override, and robots to stored fields
- Handover requires SEO team can edit without code deploy

## Verification after changes

1. Re-run affected handover or audit items only.
2. Confirm sitemap and canonicals match preferred host.
3. Re-test schema on rendered pages.
4. Update the report (Pass/Fail) for fixed items.
