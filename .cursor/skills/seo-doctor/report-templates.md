# Report templates

Use the template matching the active mode. Replace placeholders; attach URL inventory as appendix when long.

---

## Handover report (`seo-doctor handover`)

```markdown
# SEO handover report

**Site:** [name or domain]
**Environment:** [production | staging]
**Date:**
**URL inventory count:** [n]

## Summary

- **Ready for handover:** [Yes | No — blockers below]
- **Blockers:** [count]
- **N/A items:** [list numbers]

## Checklist (19 items)

| # | Item | Status | Evidence | Owner | Notes |
|---|------|--------|----------|-------|-------|
| 1 | Website speed | Pass/Fail/N/A/Blocked | | dev | |
| 2 | Mobile responsiveness | | | | |
| … | … | | | | |
| 19 | H1 heading | | | | |

## Per-page spot check (meta, H1, noindex, canonical)

| URL | Title unique | Meta unique | One H1 | Canonical OK | Noindex OK |
|-----|--------------|-------------|--------|--------------|------------|
| | | | | | |

## Open issues (must resolve before launch)

1. [Issue] — **Owner:** — **Action:**

## Dependencies (SEO / content)

- [Item needing copy, keywords, or GSC access]
```

---

## Full-site audit report (`seo-doctor full-site`)

```markdown
# Full-site SEO audit

**Site:** [domain]
**Environment:**
**Date:**
**Mode:** full-site
**URLs audited:** [count]

## Executive summary

**Overall health:** [Strong | Needs work | Critical issues]

**Top priorities (3–5):**
1.
2.
3.

**Quick wins:**
-

## URL inventory

[List or link to appendix — all indexable URLs in scope]

## Handover gate summary

| Failed handover items | Count |
|-----------------------|-------|
| | |

[Optional: embed handover table or reference separate handover run]

## Technical SEO findings

| Issue | Impact | Evidence | Fix | Priority |
|-------|--------|----------|-----|----------|
| | High/Med/Low | | | 1–5 |

## On-page findings (by URL or template)

### Template: [e.g. homepage]

| URL | Issue | Impact | Fix | Priority |
|-----|-------|--------|-----|----------|

### Template: [e.g. service]

| URL | Issue | Impact | Fix | Priority |

## Content and authority

| Issue | Impact | Evidence | Fix | Priority |
|-------|--------|----------|-----|----------|

## Prioritized action plan

1. **Critical** — indexation/blocking
2. **High** — money pages, CWV, canonicals
3. **Quick wins**
4. **Long-term** — content, authority
```

---

## Page audit report (`seo-doctor page <url>`)

```markdown
# Page SEO audit

**URL:** [full URL]
**Environment:**
**Date:**
**Route / file:** [e.g. app/(marketing)/about/page.tsx]

## Summary

**Page health:** [Strong | Needs work | Critical]

**Top issues:**
1.
2.

## Page checks

| Check | Status | Evidence |
|-------|--------|----------|
| Title | | |
| Meta description | | |
| H1 (single) | | |
| Canonical | | |
| Indexation (no unwanted noindex) | | |
| Schema (validated in DOM) | | |
| Core content / intent | | |
| Images (alt, format) | | |
| Internal links in/out | | |

## Findings

| Issue | Impact | Evidence | Fix | Priority |
|-------|--------|----------|-----|----------|
| | | | | |

## Site context (only if relevant to this URL)

- [e.g. robots.txt blocks /blog/* — affects this post]
- [e.g. canonical host mismatch]

## Recommended next steps

1.
```
