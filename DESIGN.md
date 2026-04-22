---
version: alpha
name: Infra Brutalist Monochrome
description: Sharp-edged, high-contrast portfolio aesthetic with restrained neon accents and subtle diagonal texture.

colors:
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
  display-xl:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 7rem
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: -0.03em
  display-lg:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 4rem
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.02em
  heading-1:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-2:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading-3:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
  body-lg:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.625
  body-md:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Inter Variable, sans-serif"
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
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px

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
  section-intro-badge:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background-0}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  section-heading:
    textColor: "{colors.foreground-0}"
    typography: "{typography.display-xl}"
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
  input-default:
    backgroundColor: "{colors.background-0}"
    textColor: "{colors.foreground-0}"
    rounded: "{rounded.none}"
    padding: "16px 16px"
    height: 56px
  input-default-focus:
    textColor: "{colors.foreground-0}"
---

# Overview

This interface is a disciplined, infrastructure-inspired brutalist system: monochrome first, accent second. It should feel technical, exact, and intentional rather than decorative. The atmosphere is built with subtle diagonal texture and strict borders, while content carries the visual weight through typography and spacing.

The emotional tone is calm confidence: quiet surfaces, strong hierarchy, and precise interactions.

## Colors

The palette is primarily grayscale, with one electric accent family used sparingly for semantic emphasis.

- Backgrounds stay near pure black in dark mode and pure white in light mode.
- Text follows a four-step luminance ladder from primary (`foreground-0`) to subtle (`foreground-3`).
- Borders are low-contrast separators, never heavy outlines.
- Accent colors (violet, cyan, magenta) are reserved for highlights, focus, and selective badges.
- Pattern color is intentionally close to the base surface to create texture without noise.

Color usage ratio should remain heavily neutral: accents should occupy a small fraction of total screen area.

## Typography

Typography is role-based and highly consistent.

- Display and section hierarchy use Space Grotesk Variable.
- Reading and descriptive copy use Inter Variable.
- Technical/meta language and code contexts use JetBrains Mono Variable.

Headlines are bold and compressed with tight tracking. Body text remains relaxed and readable. Labels and metadata use uppercase treatment with added tracking to communicate system structure.

## Layout

Layout is modular, wide, and rhythm-driven.

- Core page content sits in a centered large container.
- Reading-heavy content uses a narrower measure.
- Sections use generous vertical spacing.
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
- Focus treatment uses an accent ring with clear contrast.

## Shapes

Shape language is hard-edged.

- Default corner profile is square.
- Rounded corners are minimal and used only where necessary.
- Cards, buttons, and fields should keep a strict geometric silhouette.
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

Buttons favor clear state transitions and high contrast over ornamentation. Inputs are rectangular, generously padded, and rely on border/focus contrast.

### Lists and Metadata

List rows use separators and muted metadata for scannability. Dots, index numbers, and uppercase labels provide structure without clutter.

## Do's and Don'ts

Do:

- Preserve a monochrome-first composition.
- Keep accents sparse and meaningful.
- Use strong heading hierarchy and generous section spacing.
- Favor borders and tonal steps over shadow-heavy depth.
- Maintain square, sharp-edged component geometry.

Don't:

- Introduce soft gradients as primary backgrounds.
- Overuse accent color for large surfaces.
- Add decorative shadows, glows, or blur-heavy effects.
- Use highly rounded corners as a default.
- Mix unrelated visual styles inside one page.
