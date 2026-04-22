# AGENTS.md

Agent operating instructions for this repository. Keep this file minimal and actionable.

## Tooling and Environment

- Package manager: pnpm
- Runtime manager: mise
- Lint/format: Biome (no ESLint/Prettier in this repo)
- Framework: Astro 6 + TypeScript + Tailwind CSS

## Commands Agents Should Use

- Install deps: `pnpm install`
- Dev server: `pnpm run dev --host 0.0.0.0`
- Build: `pnpm run build`
- Lint: `biome check --write .`
- Format: `biome format --write .`

## Directory Objectives and Placement Rules

Use this section to decide exactly what to create and where.

- Root config files (`astro.config.mjs`, `tsconfig.json`, `biome.json`, `mise.toml`, `package.json`): framework/tooling/runtime configuration only. Do not place feature logic here.
- `content/posts/`: blog post content files (`.md`/`.mdx`) with post frontmatter.
- `content/projects/`: project showcase entries (`.md`/`.mdx`) with project frontmatter.
- `content/**/images/`: content-specific images referenced by markdown/mdx entries.
- `data/config.ts`: global site identity and cross-site constants.
- `data/homepage.ts`: homepage section text/order/content configuration.
- `src/pages/`: route entry files only. Keep pages thin and compose with components.
- `src/layouts/`: layout shells shared by multiple pages/routes.
- `src/components/core/`: navigation, SEO, shell, and cross-site structural primitives.
- `src/components/homepage/`: components used only by the homepage route.
- `src/components/post/`: post list/detail/pagination presentation components.
- `src/components/project/`: project listing/card/list-item presentation components.
- `src/components/ui/`: generic reusable UI primitives (button/input/badge/card-style blocks).
- `src/lib/`: pure utilities, transforms, helpers, and typed shared logic.
- `src/styles/global.css`: design tokens, global resets, global element defaults.
- `src/assets/icons/`: source-managed icon assets used by components/pages.
- `public/`: static passthrough files served as-is (do not put source-only modules here).
- `scripts/`: repository automation scripts (setup, helper utilities, maintenance).

### File Creation Decisions

- New route: create under `src/pages/` with Astro file-based routing.
- New reusable page section: create in the relevant `src/components/<domain>/` folder.
- New generic primitive used across sections: create in `src/components/ui/`.
- New shared helper function: create or extend module in `src/lib/`.
- New global site setting: add to `data/config.ts`.
- New homepage-specific content/config: add to `data/homepage.ts`.
- New post/project entry: add markdown/mdx in `content/posts/` or `content/projects/`.
- New global style token/rule: add to `src/styles/global.css`.

## UI System and Visual Philosophy

Preserve a strict, intentional visual language.

- Geometry: hard edges only. Use zero border radius by default.
- Corner policy: avoid rounded corners unless explicitly requested.
- Color direction: mostly monochrome/neutral palette with one restrained accent color.
- Contrast: keep strong text/background contrast and subtle separators.
- Ornamentation: minimal effects; avoid heavy shadows, glow, or noisy decoration.
- Component consistency: reuse existing UI patterns before creating new visual patterns.
- Density and spacing: use a disciplined spacing scale and align to existing rhythm.
- Motion: keep animations subtle and purposeful, not decorative.

### UI Implementation Rules

- Prefer tokens/variables from `src/styles/global.css` instead of hardcoded ad-hoc values.
- If introducing a new component visual, first check `src/components/ui/` for reuse.
- Keep interaction states clear (hover/focus/active) while maintaining the sharp-edge style.
- Preserve existing typography and hierarchy unless a specific redesign is requested.

## Design Reference

- Use [DESIGN.md](DESIGN.md) as the canonical design-system specification for tokens, component behavior, visual rationale, and do/don't guidance.
- When there is overlap, follow [DESIGN.md](DESIGN.md) instead of rewriting duplicated design rules in this file.

## Content Conventions

- Content lives in [content/posts/](content/posts/) and [content/projects/](content/projects/).
- Keep frontmatter aligned with [src/content.config.ts](src/content.config.ts).
- Respect `draft` and `featured` semantics used by listing pages.
- Post/project card behavior and ordering rely on configured metadata (for example `pubDatetime`, `order`, `hasPage`).
