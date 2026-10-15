# AGENTS.md

## Stack and checks

- Astro, TypeScript, Tailwind CSS; use pnpm and mise.
- Use Biome for linting/formatting; no ESLint or Prettier.
- Run `mise run typecheck`, `pnpm exec biome check .`, `prek run --all-files`, and `pnpm run build` for code changes.
- Check affected UI in the browser, including mobile when relevant.
- Keep typechecking/builds out of hooks and CI unless requested.
- Keep TypeScript on `^6.0.3` while required by `astro check`; let pnpm manage the lockfile.

## Code and content

- Use aliases: `@/*` for `src/`, `@data/*` for `data/`, `@posts/*` for post content.
- Keep routes thin; put shared shells in `src/layouts/` and components in their domain folders.
- Keep homepage copy in its owning Astro component; global identity belongs in `data/config.ts`.
- Put articles/projects in `content/`; consult `src/content.config.ts` for schemas.
- Use `getCollection()`/`getEntry()` for content and Astro `<Image>` for local images.
- Prefer static Astro rendering; add client JavaScript only for required interactions.
- Reuse icons in `src/assets/icons/` through `astro-icon`; icons should inherit `currentColor`.
- Keep pure shared helpers in `src/lib/` and automation in `scripts/`.

## Visual rules

- Hard edges only: no rounded corners unless explicitly requested.
- Use tokens from `src/styles/global.css` and reuse existing components.
- Keep the neutral palette, restrained accents, spacing, and purposeful motion consistent.
- All dashed lines use the shared 3px dash / 3px gap, 1px thick patterns, including link underlines. Avoid native dashed borders/underlines.
- Preserve accessible keyboard/focus behavior and reduced-motion support.
