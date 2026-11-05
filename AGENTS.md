<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project Overview

This is a social media management marketing application. It primarily serves marketing pages (home, about, and related static pages) and rarely talks to an external backend API (e.g. the blog).

Stack and design workflow:

- Tailwind CSS and shadcn/ui are the component library and design system.
- Custom color variables live in `globals.css` so tokens can match the Figma design.
- Frontend UI is built from Figma frames created by the design team; use the Figma MCP to reference those frames when implementing components.

## Image Assets

Images from Figma (backgrounds, graphics, icons) are manually downloaded under `public/images/`, grouped by **marketing area** and **section** — not under a generic `pages/` folder.

| Path | Purpose |
|------|---------|
| `public/images/landing/` | Landing and shared marketing chrome (hero, footer, section art) |
| `public/images/landing/{section}/` | Assets for one landing section (e.g. `faq/`, `how-it-works/`) — mirrors `components/shared/landing/{section}/` when the section has its own folder |
| `public/images/landing/shared/` | Landing assets reused across multiple sections |
| `public/images/ui/` | Global UI assets (icons, sprites) not tied to one page |

When a new marketing route is added (e.g. service), use the same pattern: `public/images/{route-area}/` and optional `{section}/` subfolders. Reference paths in `data/` as root-relative strings (e.g. `"/images/landing/hero-background.png"`).

When the app supports dark mode, a section folder may use `white/`, `dark/`, and `shared/` subfolders. This project is currently light-mode only — store files directly in the section folder with no theme subfolders unless dark mode is introduced.

## Global Rules

- **Imports:** Use the `@/` alias (`@/*` → project root). Do not introduce a `src/` directory; this repo keeps `app/`, `components/`, `lib/`, etc. at the repository root.
- **File names:** Use kebab-case for all new `.ts` / `.tsx` files (e.g. `hero-section.tsx`, `customer-reviews-section.tsx`).
- **Links:** Always use the custom `LinkTo` component (`@/components/shared/link-to`) instead of importing `Link` from `next/link` directly. Extend `LinkTo` if a prop is missing — do not bypass it.

## Project Directory Structure (Next.js App Router)

This project follows a strict, opinionated folder structure. **Match the existing tree before adding files.** Do not deviate without explicit instruction.

There is **no** `src/` prefix. The canonical layout is below.

### Rules

1. **`app/` is routing-only.** Only `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, route groups, and `globals.css` live here. No reusable UI, static copy, or types — except colocated `_components/` (see rule 2).

2. **Colocate route-only UI** in `app/<segment>/_components/` (underscore prefix = not a URL segment). Use this for components used on a single route and nowhere else. Marketing sections that appear on multiple routes belong under `components/shared/` instead.

3. **Route groups** `(name)` organize URLs and layouts without changing the path:
   - `(marketing)` — shared marketing shell (e.g. pre-footer CTA + footer in `app/(marketing)/layout.tsx`).
   - Nested groups like `(landing)` are allowed when a group needs its own `page.tsx` at `/` while sibling routes stay under the same marketing layout.

4. **`components/`**
   - `components/ui/` — shadcn/ui primitives only; extend via composition, never fork in place (see Component Creation Policy).
   - `components/shared/` — app-wide or cross-route UI.
   - `components/shared/landing/` — landing page sections and marketing chrome (navbar, hero, footer pieces, etc.).
   - `components/shared/{area}/` — same pattern for other marketing areas (e.g. `service/` when that page grows).
   - **Section folders:** For a large Figma section, use `components/shared/{area}/{section-name}/` with a `{section-name}-section.tsx` entry component and smaller siblings in that folder (e.g. `faq/faq-section.tsx`, `faq/faq-accordion.tsx`). Simpler sections can stay as single files at the `{area}/` level (e.g. `cta-section.tsx`).

5. **`data/` — static content and asset paths.** Marketing copy, lists, and image URL strings live here, not inline in components. Mirror the area in a subfolder:
   - `data/landing/{section}.ts` exports a typed constant (e.g. `landingHeroContent`).
   - `data/service/` — same for the service route as it is built out.
   - One file per major section; keep Figma-driven text and `/images/...` paths in data, not hard-coded in JSX.

6. **`types/` — TypeScript shapes for `data/`.** Mirror `data/` paths:
   - `types/landing/{section}.ts` defines types imported by both `data/landing/{section}.ts` and section components.
   - Do not duplicate domain types in random component files if they describe shared content.

7. **`lib/`** — framework-agnostic helpers (`cn`, formatters, API clients, validation). **`hooks/`** — shared React hooks not tied to one route.

8. **`features/<feature-name>/`** — optional future home for large domains (auth, billing) with local `components/`, `hooks/`, `actions.ts`, `types.ts`. Prefer `data/` + `components/shared/{area}/` for marketing pages until a feature justifies its own module.

9. **`config/`** — optional app-wide constants when needed.

10. **API routes:** `app/api/<resource>/route.ts`.

11. **Placement checklist:** routing → `app/`; route-only UI → `app/.../_components/`; marketing section UI → `components/shared/{area}/`; copy + asset paths → `data/{area}/`; types for that copy → `types/{area}/`; primitives → `components/ui/`; utilities → `lib/`.

### Marketing page module pattern

For each Figma section on a marketing page, keep the same three-part split:

1. `types/{area}/{section}.ts` — content types.
2. `data/{area}/{section}.ts` — default content implementing those types.
3. `components/shared/{area}/...` — presentation; default-import content from `@/data/...`, accept optional `content` prop for overrides/tests.

Wire sections in the route `page.tsx` as a ordered list of section components. Shared chrome across routes (e.g. CTA + footer) belongs in the route-group `layout.tsx`, not duplicated on every page.

### Reference structure (this repo)

```
./
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── (marketing)/
│       ├── layout.tsx          # shared CTA + footer
│       ├── (landing)/
│       │   └── page.tsx        # `/` — composes landing sections
│       └── service/
│           └── page.tsx        # `/service`
├── components/
│   ├── ui/                     # shadcn primitives
│   └── shared/
│       ├── link-to.tsx
│       └── landing/
│           ├── hero-section.tsx
│           ├── cta-section.tsx
│           ├── footer-section.tsx
│           └── faq/
│               ├── faq-section.tsx
│               └── faq-accordion.tsx
├── data/
│   └── landing/
│       ├── hero.ts
│       └── faq.ts
├── types/
│   └── landing/
│       ├── hero.ts
│       └── faq.ts
├── lib/
│   └── utils.ts
├── hooks/
├── public/
│   └── images/
│       ├── landing/
│       └── ui/
└── (optional later: features/, config/, app/api/)
```

If a new file does not clearly fit, ask before creating it rather than guessing.

## Component Creation Policy (shadcn/ui)

Before creating any new UI component, always check whether a shadcn/ui component already covers the need. Never build a component from scratch if a suitable shadcn/ui equivalent exists.

### Rules

1. **Check shadcn/ui first.** Before writing a new component, check whether a shadcn/ui component already installed in the project covers the need, and if not, check whether shadcn/ui offers one (e.g. `button`, `input`, `dialog`, `select`, `dropdown-menu`, `form`, `card`, `table`, etc.).

2. **If it exists and fits as-is, use it directly.** Import and use the shadcn/ui component without wrapping or duplicating it.

3. **If it exists but needs visual or behavioral changes, extend it — don't fork it.** Create a new custom component that wraps/composes the shadcn/ui primitive rather than copy-pasting its source and modifying it in place.

   Example: needing a `Button` with a built-in loading spinner → create a `LoadingButton` component that renders and extends the shadcn/ui `Button`, rather than duplicating its source or building a new button from scratch.

4. **If the shadcn/ui component isn't installed yet but exists in the library**, install it via the shadcn CLI (`npx shadcn@latest add <component>`) before using or extending it. Do not hand-write a component that shadcn/ui already provides.

5. **Only build a component fully from scratch** if no shadcn/ui equivalent exists for the use case.

6. **Never modify shadcn/ui base component files directly** to add custom/one-off behavior. Treat installed shadcn/ui components as an untouched base layer — always extend via composition instead. This keeps future `shadcn add` updates safe and non-destructive.

7. When unsure whether a shadcn/ui component covers the need or how to extend it correctly, ask before building a custom component from scratch.

Follow the project's existing directory structure rules for where new and custom components should be placed.
