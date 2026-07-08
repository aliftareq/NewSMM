<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Global Rules

- Always use the custom `LinkTo` component instead of importing `Link` from `next/link` directly. `LinkTo` is a wrapper around `next/link` and supports the same props (`href` etc.). If it's missing a prop or behavior you need, extend `LinkTo` itself rather than falling back to `next/link` directly.

## Project Directory Structure (Next.js App Router)

This project follows a strict, opinionated folder structure. Always adhere to it when creating, moving, or refactoring files. Do not deviate from this structure without explicit instruction.

### Rules

1. **`src/app/` is routing-only.** Only place `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, and route groups/segments here. Never put business logic, data-fetching utilities, or reusable components directly in `app/` outside of colocated private folders.

2. **Colocate route-specific components** in a `_components/` private folder inside the relevant route segment (e.g. `app/dashboard/_components/`). The underscore prefix opts the folder out of routing — never omit it.

3. **Use route groups** `(groupName)` to organize routes without affecting the URL, and to apply different root layouts to sections of the app (e.g. `(marketing)`, `(auth)`).

4. **Shared, reusable components** go in `src/components/`:
   - `components/ui/` — low-level design-system primitives (buttons, inputs, etc.)
   - `components/shared/` — higher-level components composed from `ui/` and used across multiple features

5. **Feature-based modules** go in `src/features/<feature-name>/`, each containing its own `components/`, `hooks/`, `actions.ts` (server actions), and `types.ts`. Use this for any domain/feature with enough surface area to warrant grouping (auth, billing, etc.) rather than scattering related files across `components/`, `hooks/`, and `app/`.

6. **Framework-agnostic logic** (DB clients, API wrappers, validation schemas, utility functions) goes in `src/lib/`.

7. **Shared custom hooks** not tied to a specific feature go in `src/hooks/`.

8. **Shared TypeScript types** not tied to a specific feature go in `src/types/`.

9. **App-wide constants/config** go in `src/config/`.

10. **Route handlers** live under `src/app/api/<resource>/route.ts`.

11. When deciding where a new file goes, ask: "Is this routing, a route-specific UI piece, a shared UI piece, feature logic, or app-wide logic?" — then place it in the corresponding location above.

### Reference structure

\```
src/
├── app/
│ ├── (marketing)/
│ ├── (auth)/
│ │ ├── login/
│ │ └── register/
│ ├── dashboard/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── loading.tsx
│ │ ├── error.tsx
│ │ └── \_components/
│ ├── api/
│ │ └── users/route.ts
│ ├── layout.tsx
│ └── globals.css
├── components/
│ ├── ui/
│ └── shared/
├── features/
│ └── auth/
│ ├── components/
│ ├── hooks/
│ ├── actions.ts
│ └── types.ts
├── lib/
├── hooks/
├── config/
└── types/
\```

If a new file doesn't clearly fit one of these locations, ask before creating it rather than guessing.

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
