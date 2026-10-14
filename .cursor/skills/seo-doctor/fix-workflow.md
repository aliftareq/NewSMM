# fix mode workflow

Use for **`seo-doctor fix`** and **`@seo-doctor fix`**. Each run is independent — do not assume a prior handover or audit in the conversation.

## Pipeline

1. **Discover** — Build an atomic **issue list** (see below).
2. **Fix** — Apply changes in the repo (priority: indexation → technical → on-page → scaffolding).
3. **Verify** — Re-check each issue after its fix attempt.
4. **Report** — Exactly two sentences, then the Issue \| Status table per [report-templates.md](report-templates.md#fix-report-seo-doctor-fix).

## Step 1: Discover

### Scope

| Invocation | Enumeration | Checklists |
|------------|-------------|------------|
| `fix` (no URL) | All indexable URLs (same rules as SKILL.md **full-site**) | Full [handover-checklist.md](handover-checklist.md) + [audit-checklist.md](audit-checklist.md) |
| `fix /path` or `fix https://...` | Single URL | Applicable handover + audit items for that URL |

Read product context files first if they exist.

### Build the issue list

- Decompose every **Fail** / gap from handover into **one row per atomic issue** (e.g. “Missing `app/sitemap.ts`”, not only “Handover item 9 failed”).
- Add every audit finding the same way (per URL when relevant).
- Include missing **expected** routes from handover item 3 (About, Contact, Terms, Privacy) as separate issues if absent.
- Do not skip ops/content issues — they appear in the table with **Not fixed** status after fix attempts.

## Step 2: Classify and fix

| Class | Examples | Action |
|-------|----------|--------|
| **Code-fixable** | `sitemap.ts`, `robots.ts`, metadata, canonical, JSON-LD, `not-found.tsx`, nav/footer links, H1/markup in route files | Implement per [nextjs-implementation.md](nextjs-implementation.md) |
| **Content / product** | Final copy, unique meta text, NAP, legal body | Scaffold route + metadata **pattern** if missing; do not invent brand copy unless product context provides it |
| **Ops / third-party** | GSC, GA4, GBP, Trustpilot, Clutch, CMS access, production HTTPS/www on host | No code fix; document in report |
| **Performance** | PSI &gt; 80 | Apply known code optimizations; full score verification may need deploy |

Attempt **every** issue once. Prefer minimal, conventional diffs matching the project.

## Step 3: Verify (per issue)

Use the strongest check available:

1. **Source/code** — File exists; `metadata` / `generateMetadata`; no erroneous `noindex`; one H1 in route component; sitemap/robots exports.
2. **Runtime** — If `node_modules` exists: `npm run build` or `npm run dev`; HTTP fetch or browser MCP for `<title>`, `link[rel=canonical]`, JSON-LD in DOM.
3. **Schema** — Rendered DOM or Rich Results Test (never static fetch alone).
4. **PSI / CWV** — Only when a public or staging URL is reachable; else status **Unable to verify — [reason]**.
5. **Mark `Fixed` only after** the specific issue passes its verification.

### Status values (required prefixes)

| Status | When |
|--------|------|
| `Fixed` | Issue addressed and verified |
| `Not fixed — [short reason]` | Cannot be resolved in repo (e.g. `needs content`, `manual / devops`) |
| `Unable to verify — [short reason]` | Fix applied or attempted but check blocked (e.g. `no staging URL`, `dependencies not installed`) |

Optional table columns: **URL** (`Site-wide` or path), **Evidence** (file path or tool).

## Step 4: Report

- Sentence 1: scope (site vs URL, route count, discover pass).
- Sentence 2: outcome counts — fixed / not fixed / unable to verify.
- Table: one row per discovered issue; **Issue** | **Status** (minimum).

Do not attach full handover or audit reports unless the user asks.

## fix mode vs other modes

| Mode | Output |
|------|--------|
| handover / full-site / page | Templates in report-templates.md |
| fix | Fix report only (two lines + table) |
