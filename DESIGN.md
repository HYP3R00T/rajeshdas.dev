---
version: alpha
name: Infra Brutalist Monochrome
description: Sharp-edged, monochrome-first interface language for technical content with restrained neon accents, diagonal stripe texture, and low-noise interaction feedback.

colors:
  primary: "#8f66ff"
  secondary: "#66e3ff"
  tertiary: "#ff669e"
  neutral: "#000000"
  background-0: "#000000"
  background-1: "#0d0d0d"
  background-2: "#1a1a1a"
  foreground-0: "#ffffff"
  foreground-1: "#cccccc"
  foreground-2: "#999999"
  foreground-3: "#666666"
  border: "#1a1a1a"
  pattern: "#050505"
  accent: "#8f66ff"
  accent-2: "#66e3ff"
  accent-3: "#ff669e"
  semantic-red: "#ff6666"
  semantic-orange: "#ffb366"
  semantic-yellow: "#ffd966"
  semantic-green: "#66ff7f"
  semantic-teal: "#66ffd9"
  semantic-blue: "#8f66ff"
  semantic-purple: "#b366ff"
  semantic-pink: "#ff669e"
  light-background-0: "#ffffff"
  light-background-1: "#f2f2f2"
  light-background-2: "#cccccc"
  light-foreground-0: "#000000"
  light-foreground-1: "#333333"
  light-foreground-2: "#666666"
  light-foreground-3: "#999999"
  light-border: "#e6e6e6"
  light-pattern: "#f7f7f7"
  light-accent: "#3600cc"
  light-accent-2: "#00a7cc"
  light-accent-3: "#cc004b"

typography:
  section-heading-fluid:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 7rem
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: -0.03em
  h1:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  h3:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
  prose-body:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.625
  body-lg:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.625
  body-md:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  mono-md:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em

rounded:
  none: 0px
  default: 0px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  section-y: 128px
  container-max: 1280px
  reading-max: 896px
  narrow-max: 672px

shadows:
  none: "none"
  subtle: "0 0 0 1px #1a1a1a"
  focus-ring: "0 0 0 2px rgba(143, 102, 255, 0.5)"

elevation:
  level-0:
    shadow: "{shadows.none}"
    backgroundColor: "{colors.background-0}"
  level-1:
    shadow: "{shadows.subtle}"
    backgroundColor: "{colors.background-1}"
  level-2:
    shadow: "{shadows.subtle}"
    backgroundColor: "{colors.background-2}"

motion:
  duration-fast: 150ms
  duration-normal: 200ms
  duration-slow: 300ms
  duration-carousel: 500ms
  easing-standard: "ease"
  easing-emphasized: "ease-in-out"
  hover-transition: "color, background-color, border-color"

components:
  page-surface:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-0}"

  nav-bar:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    height: 96px

  section-intro-badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background-0}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "4px 12px"

  section-intro-badge-outline:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "4px 12px"

  section-heading:
    textColor: "{colors.foreground-0}"
    typography: "{typography.section-heading-fluid}"

  card-default:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    padding: 24px

  card-default-hover:
    backgroundColor: "{colors.background-1}"

  button-primary:
    backgroundColor: "{colors.foreground-0}"
    textColor: "{colors.background-0}"
    rounded: "{rounded.none}"
    typography: "{typography.body-sm}"
    padding: "8px 16px"
    height: 40px

  button-primary-hover:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-0}"

  button-secondary:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
    height: 40px

  button-secondary-hover:
    backgroundColor: "{colors.background-1}"
    textColor: "{colors.foreground-0}"

  button-outline:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
    height: 40px

  button-ghost:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
    height: 40px

  button-link:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    padding: "4px 0px"

  icon-button-sm:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    width: 26px
    height: 26px

  icon-button-md:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    width: 32px
    height: 32px

  icon-button-lg:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    width: 42px
    height: 42px

  input-default:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-0}"
    rounded: "{rounded.none}"
    padding: "16px 16px"
    height: 56px

  input-default-focus:
    textColor: "{colors.foreground-0}"

  textarea-default:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-1}"
    rounded: "{rounded.none}"
    padding: "16px 16px"

  prose-blockquote:
    backgroundColor: "{colors.background-2}"
    textColor: "{colors.foreground-0}"
    rounded: "{rounded.none}"
    padding: "16px 24px"

  prose-inline-code:
    backgroundColor: "{colors.background-2}"
    textColor: "{colors.foreground-0}"
    typography: "{typography.mono-md}"
    rounded: "{rounded.none}"
    padding: "2px 6px"
---

# Overview

This interface is a disciplined, infrastructure-inspired brutalist system: monochrome first, accent second. It should feel technical, exact, and intentional rather than decorative. The atmosphere is built with subtle diagonal texture and strict borders, while content carries the visual weight through typography and spacing.

The emotional tone is calm confidence: quiet surfaces, strong hierarchy, and precise interactions.

## Visual Theme & Atmosphere

The system is built for developer audiences who value readability, structure, and signal over decoration. Base surfaces stay very dark, typography carries hierarchy, and accents appear only where attention must shift quickly.

The visual texture is intentionally restrained: selective diagonal stripe overlays create depth without gradients or blur-heavy ornamentation.

## Colors

The palette is primarily grayscale, with one electric accent family used sparingly for semantic emphasis and interaction focus.

- Backgrounds stay near pure black in dark mode and pure white in light mode.
- Text follows a four-step luminance ladder from primary (`foreground-0`) to subtle (`foreground-3`).
- Borders are low-contrast separators, never heavy outlines.
- Accent colors (violet, cyan, magenta) are reserved for highlights, focus, and selective badges.
- Pattern color is intentionally close to the base surface to create texture without noise.

Color usage ratio should remain heavily neutral: accents should occupy a small fraction of total screen area.

## Typography

Typography is role-based and highly consistent.

- Display and section hierarchy use Space Grotesk Variable.
- General interface text (navigation, controls, metadata, labels) uses JetBrains Mono Variable.
- Reading paragraphs in long-form prose use Inter Variable.
- Technical/meta language and code contexts use JetBrains Mono Variable.

Headlines are bold and compressed with tight tracking. Section headlines use a fluid scale: `clamp(3rem, 10vw, 7rem)`. Body text remains readable with relaxed line-height. Labels and metadata often use uppercase treatment with added tracking to communicate structure.

## Layout

Layout is modular, wide, and rhythm-driven.

- Core page content sits in a centered large container (1280px max).
- Reading-heavy content uses narrower measures (896px and 672px ranges).
- Sections use generous vertical spacing (commonly 128px).
- Cards and lists align to a strict spacing scale with clear separators.

Composition pattern:

1. Intro badge
2. Large section title
3. Supporting paragraph
4. Dense but structured content block (grid or list)

## Elevation & Depth

Depth is intentionally minimal.

- Surfaces are mostly flat.
- Separation is created by border contrast and tonal shifts, not heavy shadows.
- Hover and active states use slight background changes and text emphasis.
- Focus treatment uses a 2px accent ring at reduced opacity.

Texture pattern model:

- Standard stripe pattern: 45 degree diagonals with 10px transparent + 10px pattern intervals.
- Dense stripe pattern: 45 degree diagonals with 2px transparent + 2px pattern intervals.
- Patterns are used only on selected hero/section surfaces.

## Shapes

Shape language is hard-edged.

- Default corner profile is square.
- Cards, buttons, badges, and fields use zero radius by default.
- Avoid soft, bubbly, or highly rounded forms.

## Components

Core component behavior should preserve strong visual discipline.

### Navigation

Navigation is compact, bordered, and centered around concise labels. It should read like a control bar, not a decorative header.

### Section Headers

Section headers are cinematic and oversized, often split across lines for impact. They should anchor each section immediately.

### Cards

Cards use thin borders, monochrome surfaces, and subtle hover shifts. Information hierarchy inside cards is explicit: title first, supporting detail second, metadata last.

### Buttons and Inputs

Buttons use five behavior variants: primary, secondary, outline, ghost, and link. Icon buttons use dedicated compact square sizes. Inputs and textareas are rectangular, generously padded, and rely on border/focus contrast instead of shadow depth.

Variant behavior model:

- Primary: high-contrast inversion treatment for strongest action emphasis.
- Secondary: bordered neutral action with subtle hover lift.
- Outline: low-surface interaction with border-led affordance.
- Ghost: minimal fill for dense control clusters.
- Link: text-forward action with underline on hover.

Focus behavior is consistent across controls: accent ring, no decorative glow.

### Badges

Badges have three variants:

- Accent badges for section labels and high-signal markers.
- Outline badges for tags and taxonomy labels.
- Default badges for low-intensity metadata contexts.

All badges remain compact, uppercase, and hard-edged.

### Prose and Content Rendering

Long-form content uses a dedicated prose system.

- Prose headings use display typography and tighter tracking.
- Paragraph text uses Inter with relaxed line-height.
- Blockquotes use an accent left border and dark inset surface.
- Inline code and code blocks use mono type and dark contrast blocks.
- Links remain underlined with accent emphasis and offset for legibility.
- Tables, lists, and dividers prioritize structure and readability over visual embellishment.

### Lists and Metadata

List rows use separators and muted metadata for scannability. Dots, index numbers, and uppercase labels provide structure without clutter.

## Do's and Don'ts

Do:

- Preserve a monochrome-first composition.
- Keep accents sparse and meaningful.
- Use strong heading hierarchy and generous section spacing.
- Favor borders and tonal steps over shadow-heavy depth.
- Maintain square, sharp-edged component geometry.
- Use texture patterns sparingly on large structural surfaces.
- Keep interaction transitions purposeful and short.

Don't:

- Introduce soft gradients as primary backgrounds.
- Overuse accent color for large surfaces.
- Add decorative shadows, glows, or blur-heavy effects.
- Use highly rounded corners as a default.
- Mix unrelated visual styles inside one page.
- Apply stylistic motion that does not communicate state or hierarchy.
