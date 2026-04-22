# AGENTS.md

Agent operating instructions for this repository. Keep this file minimal and actionable.

## Primary Sources

- Astro standards: [.github/instructions/astro.instructions.md](.github/instructions/astro.instructions.md)
- Commit format: [.github/instructions/commitMessageGeneration.instructions.md](.github/instructions/commitMessageGeneration.instructions.md)

## Tooling and Environment

- Package manager: pnpm
- Runtime manager: mise
- Lint/format: Biome (no ESLint/Prettier in this repo)
- Framework: Astro 6 + TypeScript + Tailwind CSS

## Commands Agents Should Use

- Install deps: `pnpm install`
- Dev server: `pnpm run dev`
- Build: `pnpm run build`
- Preview: `pnpm run preview`
- Lint: `mise run lint`
- Lint with fixes: `mise run lint-fix`
- Format: `mise run format`
- CI-style checks: `mise run biome-ci`

Notes:

- `mise dev` runs Astro with host binding for container/dev-network access.
- No dedicated automated test command is currently configured.

## Architecture Map

- Pages/routes: [src/pages/](src/pages/)
- Shared layouts: [src/layouts/](src/layouts/)
- Components:
    - Core: [src/components/core/](src/components/core/)
    - Homepage: [src/components/homepage/](src/components/homepage/)
    - Blog post UI: [src/components/post/](src/components/post/)
    - Project UI: [src/components/project/](src/components/project/)
    - Reusable UI primitives: [src/components/ui/](src/components/ui/)
- Content schema: [src/content.config.ts](src/content.config.ts)
- Site config and nav/page size: [data/config.ts](data/config.ts)
- Shared types: [src/lib/types.ts](src/lib/types.ts)
- Global styling/tokens: [src/styles/global.css](src/styles/global.css)

## Content Conventions

- Content lives in [content/posts/](content/posts/) and [content/projects/](content/projects/).
- Keep frontmatter aligned with [src/content.config.ts](src/content.config.ts).
- Respect `draft` and `featured` semantics used by listing pages.
- Post/project card behavior and ordering rely on configured metadata (for example `pubDatetime`, `order`, `hasPage`).

## Implementation Guidance

- Prefer server-rendered Astro components; use client interactivity only when needed.
- Reuse existing components before creating new ones.
- Preserve the established visual language and CSS variable system in [src/styles/global.css](src/styles/global.css).
- Keep edits focused; do not refactor unrelated files.
- When changing content schemas, update both schema and all affected content/frontmatter.

## Quality Bar

- Run lint or format commands after non-trivial edits.
- For Astro/TypeScript issues, use `astro sync` when type generation is stale.
- Follow Conventional Commits from [.github/instructions/commitMessageGeneration.instructions.md](.github/instructions/commitMessageGeneration.instructions.md).
