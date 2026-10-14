# SEO audit checklist

Used in **full-site** (complete) and **page** (applicable sections) modes. Tags:

- **SiteOnly** — Site-wide; skip in **page** unless the issue affects the target URL.
- **PerPage** — Run on every enumerated URL (**full-site**, **handover** per-page handover items) or the single URL (**page**).
- **SiteSampleOrFull** — **full-site:** assess site-wide patterns and key templates; blog posts per enumeration rules in SKILL.md. **page:** this URL only.

Record findings as Issue / Impact / Evidence / Fix / Priority (see [report-templates.md](report-templates.md)).

---

## 1. Crawlability and indexation

### Robots.txt — SiteOnly

- No unintentional blocks on indexable sections
- Sitemap directive present when sitemap exists
- Staging rules do not leak to production

### XML sitemap — SiteOnly

- Accessible, valid XML
- Only canonical, indexable URLs
- Submitted to Search Console when available
- Updated when routes change
- No polluted parameters or duplicate URLs

### Site architecture — SiteOnly

- Important pages within ~3 clicks of home
- Logical hierarchy; minimal orphan indexable pages
- Internal hub structure (services, categories, blog)

### Crawl budget — SiteOnly (large sites)

- Parameter/facet URLs controlled
- Pagination canonicalized appropriately
- Session IDs not in URLs

### Index status — SiteOnly

- `site:domain` spot-check vs expected
- Search Console coverage (if access)
- Indexed count vs sitemap count

### Indexation issues — PerPage + SiteOnly

- Unwanted noindex on money pages
- Canonical points to wrong URL or off-domain
- Redirect chains/loops (SiteOnly)
- Soft 404s
- Duplicates without canonicals

### Canonicalization — PerPage + SiteOnly

- Self-referencing canonical on unique pages
- HTTP → HTTPS in canonicals
- www vs non-www single version
- Trailing slash policy consistent

---

## 2. Technical foundations

### Core Web Vitals — SiteOnly (sample key URLs) + PerPage for page mode

- LCP &lt; 2.5s
- INP &lt; 200ms
- CLS &lt; 0.1

### Speed — SiteOnly

- TTFB, images, JS/CSS weight, caching, CDN, fonts
- Tools: PageSpeed Insights, WebPageTest, DevTools, GSC CWV report

### Mobile — SiteOnly + PerPage

- Responsive (not separate m. domain)
- Viewport, tap targets, no horizontal scroll
- Same primary content as desktop

### Security and HTTPS — SiteOnly

- Full-site HTTPS, valid cert, no mixed content
- HTTP → HTTPS redirects
- HSTS (bonus)

### URL structure — SiteOnly + PerPage

- Readable URLs, consistent casing and slashes
- Minimal unnecessary query params

---

## 3. International SEO (if multi-locale)

**SiteOnly** — Skip entire section if single language.

### Hreflang

- Self-reference and reciprocal links
- Valid ISO codes (e.g. `en-GB`, not `en-UK`)
- Targets 200, indexable, match canonical
- Consider `x-default` when needed

### Multilingual canonicals

- Each locale self-canonical; no cross-locale canonical to another language
- Canonical URL in hreflang set

### Sitemaps with alternates

- `xhtml:link` alternates when using sitemap hreflang

### Locale URL structure

- Prefer subdirectories (`/en/`, `/fr/`)
- Avoid IP or Accept-Language negotiation for Googlebot

### Next.js note — SiteOnly

- `metadata.alternates.languages` does not auto-add self-reference for the current locale — add explicitly.

### Content across locales — SiteSampleOrFull

- Main content translated, not only chrome
- Thin duplicate locales hurt site-wide quality

---

## 4. On-page optimization

### Title tags — PerPage

- Unique, primary topic near front, ~50–60 chars, aligned with H1
- Issues: duplicates, truncation, stuffing, missing, heavy rewrites in SERPs

### Meta descriptions — PerPage

- Unique, ~150–160 chars, value prop and CTA
- Issues: duplicates, auto-generated fluff, wrong length

### Headings — PerPage

- One H1; logical H2–H3 hierarchy; not styling-only headings

### Content — PerPage + SiteSampleOrFull

- Matches search intent; depth appropriate to query
- Keyword in opening where natural; related terms used
- Thin pages, doorways, near-duplicates flagged

### Images — PerPage

- Descriptive filenames and alt text
- Compression, WebP/AVIF where appropriate, lazy loading, responsive `srcset`

### Internal linking — PerPage + SiteOnly

- Money pages well linked; descriptive anchors
- No broken links; reasonable link count
- Issues: orphans, over-optimized anchors, footer spam

### Keyword targeting — SiteSampleOrFull + PerPage

- Clear primary keyword per page; title/H1/URL alignment
- Site-wide: cannibalization, gaps, topical clusters

---

## 5. Content quality

**SiteSampleOrFull** — Deep on money pages and content templates; all sitemap posts in **full-site** unless user narrows scope.

### E-E-A-T signals

- Experience, expertise, authoritativeness, trust
- Author credentials, sourcing, contact/legal pages, HTTPS

### Depth and freshness

- Covers topic comprehensively vs competitors
- Updated where YMYL or time-sensitive

### Engagement (if analytics access)

- Context for bounce, time on page, paths — not sole ranking proof

---

## 6. Authority and links

**SiteSampleOrFull**

- Branded search and backlink profile (if tools available)
- Toxic patterns, obvious link gaps vs competitors
- Local: citations, reviews, GBP alignment (if local business)

---

## 7. Site-type quick notes

Use when interpreting findings — not extra mandatory checks.

| Type | Watch for |
|------|-----------|
| SaaS / product | Thin feature pages, missing comparisons/alternatives, blog disconnected from product |
| E-commerce | Thin categories, duplicate descriptions, product schema, faceted duplicates |
| Content / blog | Cannibalization, stale posts, weak author pages, poor clustering |
| Local | NAP consistency, local schema, location pages |
| Multilingual | Hreflang/canonical conflicts, thin translations |
