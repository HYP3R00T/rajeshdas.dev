# AGENTS.md

Agent operating instructions for this repository. Keep this file minimal and actionable.

## Tooling and Environment

- Package manager: pnpm
- Runtime manager: mise
- Lint/format: Biome (no ESLint/Prettier in this repo)
- Framework: Astro 6 + TypeScript + Tailwind CSS

## TypeScript Path Aliases

The following path aliases are configured in [tsconfig.json](tsconfig.json):

- `@/*` → `./src/*` (source files)
- `@posts/*` → `./content/posts/*` (post content)
- `@data/*` → `./data/*` (configuration data)

Use these aliases in imports instead of relative paths for better maintainability.

## Configuration Files Reference

Key configuration files and their purposes:

- [astro.config.mjs](astro.config.mjs): Astro framework configuration, integrations, build settings
- [tsconfig.json](tsconfig.json): TypeScript compiler options and path aliases
- [biome.json](biome.json): Biome linter and formatter rules
- [mise.toml](mise.toml): Runtime version management (Node.js, pnpm)
- [package.json](package.json): Dependencies and npm scripts
- [src/content.config.ts](src/content.config.ts): Content collection schemas for posts and projects
- [data/config.ts](data/config.ts): Global site configuration and identity
- [data/homepage.ts](data/homepage.ts): Homepage content and section configuration

## Commands Agents Should Use

- Install deps: `pnpm install`
- Dev server: `pnpm run dev --host 0.0.0.0`
- Build: `pnpm run build`
- Preview build: `pnpm run preview`
- Type check: `pnpm run astro check`
- Lint: `biome check --write .`
- Lint (dry-run): `biome check .`
- Format: `biome format --write .`
- Clean build artifacts: `rm -rf dist .astro`

## Development Workflow

Standard workflow for making changes:

1. Read relevant files to understand current implementation
2. Make changes using appropriate editing tools
3. Run type check: `pnpm run astro check`
4. Run lint: `biome check --write .`
5. Test locally: `pnpm run dev --host 0.0.0.0`
6. Build to verify: `pnpm run build`
7. Preview production build: `pnpm run preview`

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
- `src/assets/icons/`: source-managed SVG icon assets used by components/pages via astro-icon.
- `public/`: static passthrough files served as-is (do not put source-only modules here).
- `scripts/`: repository automation scripts (setup, helper utilities, maintenance). Use `scripts/download-icon.sh` to add new icons.

### File Creation Decisions

- New route: create under `src/pages/` with Astro file-based routing.
- New reusable page section: create in the relevant `src/components/<domain>/` folder.
- New generic primitive used across sections: create in `src/components/ui/`.
- New shared helper function: create or extend module in `src/lib/`.
- New global site setting: add to `data/config.ts`.
- New homepage-specific content/config: add to `data/homepage.ts`.
- New post/project entry: add markdown/mdx in `content/posts/` or `content/projects/`.
- New global style token/rule: add to `src/styles/global.css`.
- New icon: use `scripts/download-icon.sh <icon-name>` to download from Lucide, then reference via astro-icon.

## Astro-Specific Conventions

Follow these Astro patterns and best practices:

- **Component Props**: Use TypeScript interfaces for component props. Define at top of `.astro` files.
- **Content Collections**: Always use `getCollection()` and `getEntry()` from `astro:content` for type-safe content access.
- **Image Optimization**: Use `<Image>` from `astro:assets` for local images, not `<img>` tags.
- **Client Directives**: Use `client:load`, `client:visible`, `client:idle` sparingly. Default to static rendering.
- **Layouts**: Use slots for content injection. Keep layout logic minimal.
- **API Routes**: Place in `src/pages/` with `.ts` extension. Export functions named after HTTP methods.
- **Frontmatter**: Keep component scripts in frontmatter section (between `---` delimiters).
- **Imports**: Use path aliases (`@/*`) instead of relative paths for cleaner imports.

## Icon System

Icons are managed via astro-icon integration with local SVG assets:

- **Location**: All icons stored in `src/assets/icons/` as SVG files
- **Usage**: Import and use via `<Icon name="icon-name" />` component from `astro-icon`
- **Adding Icons**: Run `scripts/download-icon.sh <icon-name>` to download from Lucide icon set
- **Naming**: Use kebab-case for icon filenames (e.g., `arrow-right.svg`, `external-link.svg`)
- **Customization**: Icons inherit color from CSS `currentColor` and can be sized via `width`/`height` props
- **Available Icons**: Check `src/assets/icons/` directory for existing icons before adding new ones

Example usage:
```astro
---
import { Icon } from 'astro-icon/components'
---
<Icon name="github" class="w-5 h-5" />
```

## Content Schema Documentation

Content collections are defined in [src/content.config.ts](src/content.config.ts).

### Posts Schema (`content/posts/`)

Required frontmatter fields:
- `title`: string - Post title
- `description`: string - Post description/excerpt
- `pubDatetime`: date - Publication date (ISO 8601 format)
- `cover`: image - Cover image (use `image()` helper)

Optional frontmatter fields:
- `coverAlt`: string - Alt text for cover image
- `featured`: boolean - Show in featured section (default: false)
- `draft`: boolean - Hide from production (default: false)
- `tags`: string[] - Post tags/categories (default: [])

Example:
```yaml
---
title: "My Blog Post"
description: "A brief description"
pubDatetime: 2024-01-15T10:00:00Z
cover: ./images/my-post.png
coverAlt: "Cover image description"
featured: true
draft: false
tags: ["typescript", "astro"]
---
```

### Projects Schema (`content/projects/`)

Required frontmatter fields:
- `title`: string - Project title
- `description`: string - Project description

Optional frontmatter fields:
- `technologies`: string[] - Tech stack (default: [])
- `icon`: string - Icon name from `src/assets/icons/`
- `order`: number - Display order in listings
- `startDate`: date - Project start date
- `endDate`: date - Project end date
- `featured`: boolean - Show in featured section (default: false)
- `draft`: boolean - Hide from production (default: false)
- `images`: image[] - Project screenshots/images
- `imageAlt`: string - Alt text for images
- `openSource`: boolean - Is open source (default: true)
- `sourceRepo`: string - GitHub/GitLab repository URL
- `website`: string - Live project URL
- `hasPage`: boolean - Has dedicated project page (default: false)

Example:
```yaml
---
title: "My Project"
description: "A cool project"
technologies: ["TypeScript", "Astro", "Tailwind"]
icon: "github"
order: 1
featured: true
openSource: true
sourceRepo: "https://github.com/user/repo"
website: "https://example.com"
hasPage: true
---
```

## Common Pitfalls

Avoid these common mistakes:

1. **Rounded Corners**: Never add `border-radius` unless explicitly requested. This site uses hard edges.
2. **Relative Imports**: Use path aliases (`@/*`) instead of `../../../` relative paths.
3. **Hardcoded Colors**: Use CSS variables from `src/styles/global.css`, not hardcoded hex/rgb values.
4. **Missing Type Checks**: Always run `pnpm run astro check` before completing tasks.
5. **Client-Side JS**: Don't add client directives unless interactivity is required. Prefer static rendering.
6. **Image Tags**: Use `<Image>` from `astro:assets`, not raw `<img>` tags for local images.
7. **Content Access**: Use `getCollection()`/`getEntry()` from `astro:content`, not file system reads.
8. **Icon Duplication**: Check `src/assets/icons/` before adding new icons. Reuse existing ones.
9. **Config Sprawl**: Don't create new config files. Use existing ones in `data/` directory.
10. **Style Inconsistency**: Match existing component patterns in `src/components/ui/` before creating new styles.

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

**CRITICAL**: The visual identity of this site is non-negotiable.

- [DESIGN.md](DESIGN.md) is the canonical design-system specification
- Contains design tokens, component behavior, visual rationale, and do/don't guidance
- When conflicts arise, [DESIGN.md](DESIGN.md) takes precedence over this file
- **Zero border radius** is a core design principle - never add rounded corners
- Review [DESIGN.md](DESIGN.md) before making any visual changes
- The design system emphasizes brutalist aesthetics: sharp edges, high contrast, minimal ornamentation

## Testing and Validation

Before completing any task, verify:

- [ ] TypeScript compiles without errors: `pnpm run astro check`
- [ ] Biome linting passes: `biome check .`
- [ ] Dev server starts successfully: `pnpm run dev`
- [ ] Production build completes: `pnpm run build`
- [ ] Preview build works: `pnpm run preview`
- [ ] No console errors in browser
- [ ] Visual changes match existing design system (check [DESIGN.md](DESIGN.md))
- [ ] New content has correct frontmatter schema
- [ ] Images use `<Image>` component with proper optimization
- [ ] Icons exist in `src/assets/icons/` and use astro-icon

## Dependency Management

Rules for managing dependencies:

- **Adding Dependencies**: Use `pnpm add <package>` for runtime deps, `pnpm add -D <package>` for dev deps
- **Updating Dependencies**: Use `pnpm update` to update all deps, or `pnpm update <package>` for specific ones
- **Removing Dependencies**: Use `pnpm remove <package>` and verify no imports remain
- **Lock File**: Never manually edit `pnpm-lock.yaml`. Let pnpm manage it.
- **Version Pinning**: Prefer exact versions for critical deps, ranges for dev tools
- **Astro Integrations**: Add via `pnpm astro add <integration>` when possible
- **Verification**: After dependency changes, run full test suite and build to verify compatibility
