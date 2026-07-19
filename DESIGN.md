---
version: alpha
name: Rajesh Das Editorial Grid
description: A responsive, content-first portfolio system built from precise borders, restrained color, and strong typography.
colors:
  background: "var(--background-0)"
  surface: "var(--background-1)"
  surface-strong: "var(--background-2)"
  foreground: "var(--foreground-0)"
  foreground-muted: "var(--foreground-2)"
  border: "var(--border)"
  accent: "var(--accent-1)"
  primary: "var(--primary)"
  primary-foreground: "var(--primary-foreground)"
typography:
  display:
    fontFamily: "Space Grotesk Variable"
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.025em
  body:
    fontFamily: "Inter Variable"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono Variable"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.12em
rounded:
  structural: 0rem
  control: 0.375rem
  full: 9999px
spacing:
  hairline: 1px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 2rem
  xl: 4rem
  section: 6rem
  site-max: 84rem
components:
  grid-frame:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.structural}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.control}"
---

# Design system

This is the living visual specification for the site. It adapts the open [DESIGN.md format](https://github.com/google-labs-code/design.md) to this repository, while the implementation remains native to Astro, Tailwind CSS, and shadcn/ui. Refine this document alongside the interface whenever a deliberate design decision changes.

## Overview

The site is an editorial portfolio for explaining Rajesh's work, ideas, writing, and projects. Its character should feel technically precise, calm, confident, and content-first.

The visual structure takes inspiration from disciplined grid-based product sites: one continuous frame, strong typography, restrained color, sharp divisions, and purposeful motion. It must not copy another site's brand, wording, assets, or exact measurements. The goal is to apply that structural thinking to this site's own content and identity.

Every page should feel like part of one system rather than a collection of independent cards. Content hierarchy comes before decoration. Borders, spacing, typography, and responsive behavior create the interface.

## Colors

`src/styles/global.css` is the implementation source of truth for color tokens. The YAML above describes their design roles; it does not replace the CSS variables.

- Preserve the existing variable names in both `:root` and `.dark`, including the shadcn mappings. Do not rename or remove them.
- Color values may be refined as the design develops. When a value changes, verify its role in both light and dark themes.
- Use semantic Tailwind classes such as `bg-background-0`, `text-foreground-0`, `text-foreground-2`, `border-border`, `bg-primary`, and `text-primary-foreground`.
- Do not hardcode hexadecimal, RGB, or HSL colors inside components when an existing semantic token represents the role.
- Keep the palette predominantly neutral. The accent family is anchored by cyan-blue: light mode uses a deeper blue with light contrast text, while dark mode uses the brighter electric cyan with dark contrast text. Use `--accent-1` selectively for focus, links, active states, featured surfaces, and decisive primary actions rather than washing large areas with it.
- Separators should remain visible without competing with content. Text and interactive states must retain accessible contrast in both themes.

## Typography

The existing typefaces are part of the site's identity and must be preserved:

- **Space Grotesk Variable** (`font-display`) for display headings and high-level statements.
- **Inter Variable** (`font-sans`) for navigation, body copy, descriptions, and long-form reading.
- **JetBrains Mono Variable** (`font-mono`) for labels, metadata, technical details, and compact status text.

Typography is responsive, not a transcription of screenshot pixels. Prefer Tailwind's rem-based scale and fluid `clamp()` values where a heading needs continuous scaling. Select sizes from content hierarchy and available space, then verify them at intermediate viewport widths.

Display text may be dense and expressive, with tight leading and tracking. Body copy should remain comfortably readable, with a restrained line length for articles. Uppercase mono labels should be short; they are navigational signals, not paragraph text.

## Layout

The page is composed as a continuous bordered grid. A section should connect visually to its neighbors rather than appearing as an isolated floating card.

### Border ownership

Each visible seam has exactly one owner:

1. The global page-rail overlay owns both persistent vertical boundaries for the entire document.
2. Each major section owns its bottom separator.
3. A grid or flex parent owns internal seams with `divide-x` or `divide-y` where practical.
4. A child may own one directional border only when the parent cannot express the division cleanly.

Never give adjacent cells both sides of the same seam. For example, if the left cell owns `border-r`, the right cell must not also own `border-l`. Prefer one parent perimeter plus internal dividers over independently bordered boxes.

Avoid negative one-pixel overlaps as a default technique. If an overlap is genuinely necessary, compensate for the displaced width and verify every downstream edge; fixing one seam must not create a gap at the far side of the row.

The global rails are rendered directly in `BaseLayout.astro`. They are absolute, non-interactive, and span the full document height. Header, main content, and footer must not redraw those outer vertical boundaries.

All meaningful content—including text, controls, cards, media, and interactive demonstrations—must remain inside the rails. Use `SiteSection.astro` for ordinary sections or `.site-grid-frame` for custom compositions, then apply padding to the cells inside that frame. Full-width section backgrounds, horizontal separators, and nonessential decoration may extend beyond the rails because they do not change the content measure.

Use the shared structural classes when appropriate:

- `.site-page-rails` creates the permanent vertical boundaries at the `84rem` site width.
- `.site-grid-frame` creates a centered, borderless `84rem` alignment frame for custom section compositions.
- `.site-section` creates a full-width major section with one bottom separator.

Use `SiteSection.astro` for ordinary page sections. It renders the full-width `.site-section` boundary and one borderless `.site-grid-frame`, accepts standard section attributes through its props, and exposes `frameClass` for the section's grid or flex composition. It deliberately adds no padding: its child cells own their spacing.

Use three consistent cell treatments with Tailwind utilities:

- **Content:** `min-w-0 px-5 py-12 md:px-10 md:py-16 lg:px-15 lg:py-20` for section introductions, prose-led cells, and primary statements.
- **Compact:** `min-w-0 p-5 md:p-7 lg:p-10` for repeated feature, testimonial, or metadata cells.
- **Flush:** `min-w-0` with no padding for media, demonstrations, marquees, and other intentionally edge-aligned content.

These are starting patterns rather than mandatory fixed heights. A composition may adjust vertical padding while preserving the same responsive inline spacing and shared alignment.

### Responsive composition

- Build fluid tracks with `minmax()`, fractional units, intrinsic sizing, and Tailwind breakpoint variants.
- Treat breakpoints as composition changes, not smaller desktop screenshots. Columns may stack, reorder, simplify, or hide nonessential visuals.
- When columns stack, replace desktop vertical dividers with mobile horizontal dividers. Do not leave an orphaned border.
- Give grid and flex children `min-w-0` where necessary, constrain media to the available width, and verify that long text or technical content cannot cross the rails.
- Use fixed dimensions only for genuinely fixed controls or hairline borders. Spacing, type, and content areas should use rem-based tokens, fractions, percentages, or content constraints.
- Preserve the frame and alignment rhythm on narrow screens while allowing content enough breathing room.
- Test widths between named breakpoints; a layout is not responsive merely because it works at the breakpoint endpoints.

The site-wide maximum width is `84rem`, exposed through Tailwind as `max-w-site`. This is a maximum rather than a fixed width: the frame remains fluid below that ceiling. Individual reading layouts may use a narrower measure inside that frame.

## Elevation & Depth

The interface is primarily flat. Establish hierarchy through tonal background layers, borders, scale, and spacing.

- Avoid drop shadows, glows, glass effects, and decorative gradients unless a documented component has a functional reason for one.
- A sticky header may use slight background transparency when readability remains reliable over page content.
- Interactive elements may change background or foreground tone on hover and active states. They should not appear to float above the grid.

## Shapes

Structural frames, sections, grid cells, navigation regions, and major content containers use zero border radius.

shadcn/ui controls may continue to use the shared `--radius` token where the control benefits from a distinct interactive shape. Do not remove or bypass that token globally. A component may intentionally override its radius to zero when it participates directly in the structural grid.

Avoid introducing rounded card collections, pills, or circular decoration by habit. Full rounding is reserved for inherently circular controls, avatars, indicators, or tags whose meaning benefits from it.

## Components

Prefer existing primitives in `src/components/ui/` and shadcn/ui before creating a new generic component. Extend variants through `className`, `cva`, or the existing component API so behavior and accessibility stay consistent.

### Header and navigation

The desktop header is a three-zone grid: identity, primary navigation, and actions. The global page rails provide its vertical boundaries; the header owns only its full-width bottom rule. The zones remain visually open without internal divider lines. Navigation is text-led: hover changes foreground emphasis without adding a filled tab or boxed boundary. The action group uses compact standalone controls rather than filling the header height. On mobile, navigation becomes a full-width stacked panel aligned to the same site frame. Theme switching must not close the menu; selecting a navigation destination may close it.

Active, hover, focus-visible, and expanded states must be recognizable without relying on motion alone. External destinations should be clearly distinguishable and use safe link behavior. In the primary navigation, append the compact up-right icon to external routes such as Projects while leaving internal destinations text-only.

### Sections and cards

Use grid cells as the default grouping mechanism. A content block should gain a complete independent border only when it is truly detached from the surrounding layout. Repeated items should share a parent grid and its dividers.

Section padding follows a consistent responsive rhythm. The final value may change by breakpoint, but adjacent sections should align on shared vertical and horizontal guides.

### Page introductions

Do not force every route through one universal hero layout. The homepage uses a purpose-built split introduction: a concise padded statement and action cell on the left, and a flush visual project stage on the right. The project stage uses a pale, low-saturation blue gradient field with broad, slowly breathing organic forms, one restrained inset slideshow card, and compact navigation controls. Its background reaches the outer rail, while the card preserves negative space around itself.

Do not draw a divider between adjacent hero cells when their contrasting background surfaces already establish the split. Reserve internal dividers for cells that share the same background and need structural separation.

Homepage hero labels are quiet inline signals rather than outlined badges. Calls to action may use the shared small control radius; the inset project preview may use a modest radius because it is a detached media surface rather than part of the structural grid. Avoid oversized project typography, dense metadata bands, or additional borders that compete with the page rails.

Evidence sections use one quiet, centered introduction followed by equal proof cells, echoing the reference site's use of generous negative space before repeated content. Cells are structural rather than detached cards: they share the page background, use single separators, and avoid rounded outer containers. Prefer a small set of meaningful operational outcomes over content counts or repository-internal implementation trivia. Proof cells show only value, unit, and outcome label; omit source labels and explanatory paragraphs when the metric already communicates the evidence. Keep the row substantially shorter than a feature-card collection.

Homepage knowledge navigation begins with the shared section header rather than an abstract diagram or duplicated chooser. Its copy explicitly explains that hands-on engineering work is published in three formats: curated skill maps, detailed articles, and concise notes. The asymmetric destination grid follows immediately, with Learn as the primary path and Articles and Notes as supporting paths. This direct hierarchy should explain both what the content is and why each format exists without relying on decorative metaphor.

State changes must preserve spatial position. Mobile navigation may fade but must not slide vertically, and project-switching controls crossfade slides within a fixed shared grid cell rather than translating the incoming or outgoing card. Icon buttons opt out of the shared one-pixel active press shift when that movement would make anchored navigation or carousel controls appear to jump.

The homepage project field stays on the same `--background-0` surface as the rest of the hero. Do not invert the field, tint it independently, or apply a texture by default; the bordered project card and content layout provide its visual separation. The selected-work label, card, counter, and navigation share one aligned content width. The label and lower control row use equal spacing from the card, with the counter opposite the navigation controls. The shared `dot-pattern-interactive` utility remains available for deliberate use elsewhere.

When a section introduction is visually distinct from the grid below it, its closing horizontal rule spans the full viewport from edge to edge. The content and repeated cells remain constrained to the global rails, and the first row must not redraw the same rule inside the frame.

Shared section headers align their title and supporting description at the same top edge on desktop; the eyebrow sits in its own row above the title. Full-width header rules use the main content container's inline size rather than viewport-width units, preventing the vertical scrollbar width from producing document-level horizontal overflow.

Use `SectionHeader.astro` for this repeated heading pattern. It standardizes the eyebrow, title, supporting copy, responsive inset rhythm, and full-viewport closing rule while allowing the following section content to choose its own grid.

Listing routes may use the same component with a level-one heading for their page introduction. On the Articles route, follow that introduction with a compact category-filter toolbar and a spacious one-to-three-column media-card archive. Cards sit within a deliberate inset and use real gaps so every article reads as an individual destination rather than another dense structural cell. Prefer three compact columns at wide desktop widths; the archive should feel lighter than the homepage showcase rather than enlarging every article into a feature panel. Categories form a small, controlled editorial taxonomy—currently Product, Engineering, and Guides—while tags remain flexible content metadata and do not drive the primary archive navigation.

Use `EditorialGrid.astro` for text-led archives that share this repeated two-to-three-column rhythm. It draws separators over the normal page surface rather than using a separator-colored grid background, so an incomplete final row never exposes filled placeholder cells.

Article cards borrow the homepage selected-work card hierarchy: full-width cover media, compact publication metadata, title, restrained description, and a bottom-right internal-navigation control. Covers use a stable widescreen crop and a very small hover zoom; the card itself keeps the shared media-card border and radius. Titles and descriptions use responsive line clamps so copy truncates before it can distort the media-to-content relationship or create uneven rows.

Render the selected article as the first grid item and distinguish it with an accent border and explicit Featured article label. It remains the same size and uses the same surface as its neighbors, so featured status does not create a separate section, duplicate the archive hierarchy, or overpower its cover image. Title, media zoom, and the internal-navigation control provide hover feedback.

Featured article selection is category-aware. The unfiltered archive promotes the newest article explicitly marked as featured; after filtering, the newest featured article within that category moves to the first cell and receives the same accent treatment. Never infer featured status from recency alone. If a category contains no explicitly featured article, its archive begins chronologically with no accented card.

Article archive state is URL-addressable. Persist the selected category and any page after the first in query parameters, omitting their default values. Opening an article and returning—through either the page's back control or normal browser history—must restore the same category and pagination position.

Article archive cards are image-led but editorially restrained. Every card uses its required cover image with a consistent crop, sufficient surrounding negative space, a short description, and a square right-arrow action. The right arrow communicates same-site navigation; never substitute the up-right external-link arrow. At narrow widths the archive becomes a single column without changing the card's internal order.

Article metadata stays purposeful: retain the publication date, omit ordinal article numbers and estimated read time, and use a right-pointing arrow for internal reading links. Reserve the up-right arrow for destinations that open outside the current site.

Fenced code blocks use a compact two-part panel. A persistent header names the language on the left, optionally followed by a filename, and keeps a labeled copy control aligned to the top-right. The highlighted source occupies a separate scrollable body below the header; never float the copy control over the final code line. Authors provide an optional filename with fenced metadata such as ` ```ts title="src/example.ts" `.

Article detail routes begin with the shared full-width section header containing the article category, title, and description. The reading section below uses a one-to-three desktop grid: a sticky sidebar for archive navigation, metadata, and a separately scrollable table of contents; and a wider article cell for the cover and prose. Sidebar separators span the full sidebar track while the controls and labels retain the standard inset. Sidebar actions fill that inset, use the standard control height, and keep their labels optically centered while directional icons remain pinned to the appropriate edge; the share action uses the accent treatment while archive navigation remains neutral. The cover is a full-bleed surface across the article track with no frame, padding, or decorative background; prose below it receives its own equal left and right inset. The sidebar becomes sticky only after its section reaches the site header, allowing the title section to leave the viewport naturally. On smaller screens, the title flows directly into the full-width cover and prose. Archive navigation, flat metadata, topics, and sharing move into separated end matter after the article; the mobile view omits the table of contents. The archive Back link preserves the reader's last category-filtered archive URL when available.

Paginate the complete in-page collection while applying category filters before pagination, so every filter operates across the full archive. Persist the active category in the URL query string so article navigation, browser history, refreshes, and shared links preserve the selected archive view. Pagination uses a full-width previous/status/next row aligned to the article rails. Archive separators are rendered as one-pixel lines over the normal page surface, never by exposing a separator-colored parent background; incomplete rows therefore retain the page background instead of producing filled placeholder cells.

The Notes archive reuses the shared section header, topic-filter toolbar, and text-led `EditorialGrid` composition. Notes deliberately omit cover imagery and featured treatment: compact topic and publication metadata lead into the title, a clamped description, and a bottom-aligned internal action. Topic routes reuse the same archive rather than introducing a second card pattern.

Individual note routes reuse the article-detail one-to-three reading architecture but omit the cover surface entirely. The wider reading track begins directly with padded prose, while the sticky desktop rail retains archive navigation, note metadata, sharing, and the table of contents. On smaller screens, the prose comes first and flat end matter below it contains Back navigation, metadata, tags, and sharing without a table of contents. Returning from a note preserves the reader's last topic-filtered archive route when available.

After measured proof, the homepage uses an asymmetric decision section for Learn, Articles, and Notes. Learn is the dominant starting route: it occupies the larger left cell, carries the section heading, and has enough negative space for one focused explanation. Articles and Notes form two quieter stacked routes on the right. This hierarchy replaces both a latest-content showcase and another equal three-card pattern: the homepage should help a visitor choose a useful path, while destination pages remain responsible for presenting their latest entries.

The final homepage call to action is one uninterrupted accent-color field with high-contrast text and a dark primary action. Its layout may use responsive columns, but it must not draw an internal divider across the colored surface.

The footer continues the global outer rails but remains visually open inside them. Use spacing to organize the brand, navigation, social, and utility groups; do not add internal vertical rules, detached panels, social pills, or a decorative oversized wordmark.

The Contact route uses one focused, viewport-aware stage rather than the shared editorial page introduction. Its desktop composition is a balanced two-column split without a center divider: a concise contact prompt and decisive accent-blue email action on the left, and one restrained inset guidance panel on the right. The panel explains what context makes an inquiry useful and may use the shared control radius because it is a detached informational surface. LinkedIn remains a quiet secondary text route rather than competing with email as another large card.

The 404 route is a quiet centered interruption rather than an editorial introduction or recovery-card grid. Give the error code, one concise explanation, a decisive Home action, and one secondary Articles route enough negative space to read immediately. Learn and Notes may remain as subdued tertiary text links. The recovery stage occupies a substantial but bounded height so the regular footer remains visible as part of the page rather than being pushed far below the error state.

Listing pages, learning indexes, article details, contact routes, and utility pages should use compositions suited to their content while sharing the same rail, typography, spacing, and separator rules. Reuse structural primitives rather than preserving an irrelevant slot arrangement.

The Learn index uses the shared section header followed by one equal-weight, two-column skill-map grid; it has no latest or featured state. On wider cards, each map places a restrained square media cell to the left of its content so artwork adds color without dominating the collection. The image and copy touch without an internal divider and read as one card, while the outer grid retains the article archive's separator rhythm. Card height equals the media dimension once the horizontal composition begins, and descriptions clamp responsively before they can stretch that height. Delay the outer two-column collection until the wide breakpoint so intermediate widths retain a spacious single-column composition. Align metadata and actions consistently, and use a right-pointing arrow for the internal map destination.

Individual skill-map routes begin with the shared page introduction, followed by a one-to-three desktop reading grid. The narrow left rail owns archive navigation, map metadata, and the intended outcome; it may become sticky once the page introduction has left the viewport. The wider right track begins with flush map artwork and continues directly into the module sequence. This keeps the visual and the actionable path in one continuous reading column while allowing metadata to remain available without competing for equal width.

The ordered learning path begins immediately below the map artwork without a redundant secondary introduction. It is a continuous one-column list rather than a collection of detached cards: each module row reserves stable tracks for its sequence number, title and summary, exceptional progress status, and internal-navigation arrow. Completed modules show no status treatment. Work in progress and Updated states use compact tags and may show an available progress note without allowing it to dominate the row. Use single parent-owned seams and right-pointing arrows for module destinations. At narrow widths, the metadata rail and module tracks stack in reading order without hiding exceptional status information.

Individual module routes reuse the article-detail reading architecture: a shared section header followed by a one-to-three desktop grid with a sticky metadata and table-of-contents sidebar, a full-bleed cover, and separately padded prose. Module-specific metadata includes its position in the map and a back-to-map action, while previous and next module navigation closes the reading column. Completed modules show no status treatment; only Work in progress and Updated modules receive a compact status callout. Because that callout is a contained feedback component rather than part of the structural grid, its outer edge uses the shared control radius. On smaller screens, the cover and module content follow the introduction immediately; after the content and module navigation, flat end matter provides Back navigation, metadata, topics, and sharing without a table of contents.

Article and module detail routes offer an optional Zen mode for uninterrupted reading. The page introduction, full-width separator below the title, and permanent `84rem` page rails remain unchanged so entering the mode never shifts the site's frame. Zen mode hides the global navigation header, footer, metadata and table-of-contents sidebar, mobile information block, and secondary module navigation. The existing three-quarter reading track keeps its `63rem` maximum width and moves into the center of the original frame; prose and media do not expand and no replacement rails are drawn around them. The title-area control and a quiet control at the end of the reading track exit the mode, `Z` toggles it, and `Escape` always restores the full page. Zen mode is temporary and resets on navigation rather than becoming a persistent site preference.

### Buttons and controls

Use shadcn button variants as the behavioral base. Within a grid seam, remove any border that would duplicate the parent structure. Maintain a visible focus ring, sufficient target size, disabled state, and clear label. Sidebar Back actions use one shared neutral outline treatment at full available width; the left arrow and label form one centered inline group with a compact gap rather than pinning the arrow to the control edge.

The programmatically focusable main-content region suppresses its browser outline because it is a structural navigation target rather than an interactive control; otherwise keyboard scrolling can draw a viewport-sized rectangle around the page. Links, buttons, inputs, and every other interactive element retain their normal visible focus treatment.

### Editorial content

Articles and notes use a narrower reading measure than product-style sections. Long-form typography should prioritize comprehension, while code, tables, callouts, and images continue to use global tokens and the same spacing rhythm. Inline code keeps its compact paragraph size in body copy, but scales proportionally when nested inside a heading so it participates in the surrounding hierarchy instead of appearing as a fixed-size annotation. Standalone external resources use the shared LinkPreview block; inline citations remain ordinary links. Link previews stay compact and contain only the resource title, available description, URL, and optional Open Graph image. Use the shared site radius on the outer block, keep media flush to the right edge without an inner frame, and do not add badges or redundant external-link controls.

### Motion

Motion explains state or guides attention. Favor short opacity and transform transitions, generally around `150ms` to `200ms`. Reveal movement should be modest—about `1rem`, not a dramatic travel distance. Honor `prefers-reduced-motion`, and never make essential content depend on animation.

## Do's and Don'ts

### Do

- Use CSS variables and semantic Tailwind utilities.
- Use rem-based or fluid measurements for responsive type and spacing.
- Give every seam a single border owner.
- Reuse shadcn/ui and existing repository primitives.
- Preserve the site's fonts and content hierarchy.
- Verify desktop, mobile, intermediate widths, light theme, dark theme, keyboard focus, and reduced motion.
- Run Astro checks, Biome, and a production build after implementation changes.

### Don't

- Do not rename or remove root-level or dark-theme token variables.
- Do not copy pixel measurements from a visual reference as fixed implementation values.
- Do not place full borders on adjacent cells and hide the resulting double seam with guesswork.
- Do not use a negative one-pixel offset without compensating for width and checking the trailing edge.
- Do not hardcode colors that already have a semantic token.
- Do not add decorative rounding, shadows, gradients, or animation without a clear role.
- Do not create a custom primitive when an existing shadcn/ui or repository component already solves the need.

### Change protocol

Before a visual change, read this file and the relevant existing component patterns. When a new decision affects the broader system, update this document in the same working change. If an implementation needs an exception, record the reason near the relevant rule rather than silently weakening consistency.

Visual validation should include seam continuity, frame alignment, overflow, intermediate viewport widths, both themes, interactive states, and readable content flow. This specification should become more precise over time, not merely longer.
