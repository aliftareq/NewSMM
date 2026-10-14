# Handover checklist (dev → SEO)

Pre-launch gate for **handover** and **full-site** modes. Mark each item **Pass**, **Fail**, **N/A**, or **Blocked**. Record evidence (URL, tool, screenshot note, or file path).

**Final requirement:** All applicable items must pass or be explicitly reported with owner and resolution plan before launch or SEO handover.

Some items need SEO or content support — note dependencies in the report.

---

## 1. Website speed

**Requirement:** Performance score above **80** on **mobile** and **desktop** (PageSpeed Insights or Lighthouse).

**Verify:** Run PSI/Lighthouse on homepage and at least one key template (e.g. service, category, blog post). Note Core Web Vitals (LCP, INP, CLS) even when score passes.

**N/A:** None for public marketing sites.

---

## 2. Mobile responsiveness

**Requirement:** Site works on mobile, tablet, and desktop.

**Verify:** Responsive layout, readable text, tap targets, no horizontal scroll, content parity with desktop for indexable pages.

---

## 3. Complete website pages

**Requirement:** All planned public pages are complete (not placeholders).

**Minimum set (extend via product context):** Home, About, Contact, Terms, Privacy.

**Verify:** Each enumerated indexable URL renders final content, working forms/links, and no “coming soon” in production handover.

---

## 4. Schema markup

**Requirement:** Relevant structured data added and **validated** (Rich Results Test or rendered JSON-LD — not static fetch alone).

**By page type (use only what fits the business — do not add fake ratings or local business for pure online SaaS):**

| Page type | Typical types |
|-----------|----------------|
| Homepage | Organization, WebSite, WebPage; add LocalBusiness if physical location; AggregateRating only if real, displayable reviews exist |
| Service / product landing | Service (or Product), Organization, WebPage; FAQPage if FAQ content exists; LocalBusiness / AggregateRating as above |

**Verify:** Each applicable template on at least one live/staging URL.

---

## 5. Business information (NAP + social)

**Requirement:** About, Contact, and site footer show correct **address** (if applicable), **phone**, **WhatsApp** (if used), **email**, and **social profile links**.

**Verify:** Consistent NAP across footer, About, and Contact; links resolve.

---

## 6. Google tools

**Requirement:** Google Search Console and Google Analytics 4 connected; SEO team has access.

**Verify:** Property verified, sitemap submitted (GSC), GA4 receiving data; document what access was granted (no secrets in reports).

---

## 7. Admin / CMS access

**Requirement:** SEO team can publish blog posts, edit content, and update SEO fields (title, description, etc.).

**Verify:** Roles documented; critical SEO fields editable without deploy.

**N/A:** Static site with no CMS — note who updates metadata (code/deploy).

---

## 8. Business profiles

**Requirement:** Google Business Profile, Trustpilot, and Clutch set up where relevant.

**Verify:** Profiles claimed, NAP aligned with site.

**N/A:** No local presence or B2B review strategy — document N/A.

---

## 9. XML sitemap

**Requirement:** Working sitemap includes **only** canonical, indexable URLs; kept up to date.

**Verify:** Fetch `/sitemap.xml` (or index); no noindex/auth URLs; matches enumeration; submitted in GSC when available.

---

## 10. Robots.txt

**Requirement:** Does not block important pages; references sitemap when appropriate.

**Verify:** Fetch `/robots.txt`; confirm allow/disallow for key paths.

---

## 11. Noindex tags

**Requirement:** Important pages (home, services, categories, key landings) must **not** have unwanted `noindex`.

**Verify:** On **each enumerated indexable URL**, check robots meta and `X-Robots-Tag` if used.

---

## 12. Canonical tags

**Requirement:** Every indexable page has the correct canonical URL.

**Verify:** Per enumerated URL — self-referencing canonical on unique pages; HTTPS and preferred host (www vs non-www) consistent.

---

## 13. Broken links and 404s

**Requirement:** No broken internal links or unwanted 404s on public pages.

**Verify:** Crawl or spot-check nav, footer, and body links on main templates; custom 404 page exists.

---

## 14. HTTPS and www redirection

**Requirement:** HTTP → HTTPS; single preferred www or non-www host with 301s.

**Verify:** Test `http://`, alternate host, and trailing-slash behavior against policy.

---

## 15. Internal linking

**Requirement:** Important pages (home, services, categories, blog index, key landings) reachable via navigation or internal links.

**Verify:** No orphan indexable money pages; blog discoverable from nav or hub pages.

---

## 16. Author profiles (blog)

**Requirement:** Authors have name, photo, bio, and profile page before handover.

**Verify:** Sample posts link to author pages with complete profiles.

**N/A:** No blog.

---

## 17. Optional vertical: marketplace / panel sites

**Requirement (when applicable):** Public statistics (e.g. orders, users, services) reflect **real data** and update automatically — not manual or fake numbers.

**Default:** **N/A** for standard marketing sites. Enable only when product context describes a panel/marketplace.

---

## 18. Meta title and description

**Requirement:** Every indexable page has a **unique**, relevant title and meta description; editable via admin when CMS exists.

**Verify:** All enumerated URLs — uniqueness, length reasonable (~50–60 title, ~150–160 description), not empty or duplicate boilerplate.

---

## 19. H1 heading

**Requirement:** Exactly **one** clear, relevant H1 per page; avoid multiple H1s.

**Verify:** All enumerated URLs in DOM (accessibility tree or rendered HTML).
