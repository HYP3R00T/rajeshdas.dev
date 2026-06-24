# Learn Strategy Working Contract

This document captures the current shared direction for the `learn` experience. It is temporary and can be deleted later, but for now it should act as the common source of truth for how we think about the feature.

## Core Positioning

The learn section is not a tutorial archive and not a second blog.

Its purpose is to curate learning paths through technical topics. The value is not rewriting what already exists online. The value is helping people understand what to learn, why it matters, what order to follow, and which resources are worth opening.

The tone should feel practical, structured, and selective. Visitors should feel that someone experienced has already reduced the noise for them.

## Primary User Experience

The `/learn` route should be a collection of skill maps.

A visitor lands on `/learn`, sees multiple curated skill maps, and chooses the one that matches their current goal. The page should make the available learning paths easy to scan, compare, and enter.

A skill map is the deeper interactive experience. It can eventually feel like a canvas or roadmap, but we should avoid making it complex just because a canvas looks impressive. The interaction should support orientation, not become the product itself.

The experience should answer these questions quickly:

- What can I learn here?
- Which path should I choose?
- What outcome does each path produce?
- What should I read or do first?
- Why is this resource or step included?

## Hierarchy

Use this terminology unless we intentionally revise it later.

### Skill Map

A skill map is a complete curated learning journey around a capability.

Example: `Python Open Source Development`.

A skill map contains multiple modules. It may eventually show module relationships visually, but it does not have to start as a complex draggable canvas.

### Module

A module is a major checkpoint inside a skill map.

Example: `Open Source Project Setup`.

A module contains multiple topics. It explains the goal, the reason the module matters, the expected outcome, and the curated sequence of topics/resources.

### Topic

A topic is a focused concept or decision inside a module.

Examples:

- Repository structure
- Package manager
- Formatter
- Linter
- Type checking
- CI pipeline
- Documentation
- License
- Code of conduct
- AI project instructions

A topic should be small enough to understand quickly and practical enough to act on.

### Resource

A resource is the thing the visitor opens, reads, watches, copies, or applies.

Resources can include:

- Official documentation
- Your own articles
- GitHub repositories
- Example files
- Videos
- Checklists
- External guides
- AI handoff prompts
- Raw markdown/context packs

## Learn Index Direction

The `/learn` page should show multiple skill maps, not the full canvas for every path.

Each skill map card should communicate:

- Title
- Short outcome
- Difficulty
- Status
- Number of modules
- Estimated time or learning weight
- Best starting module
- Tags or domains

The page should feel like a clean selection surface. It should not overwhelm people with every topic from every path at once.

## Skill Map Page Direction

A skill map page should show the full path for one learning journey.

Possible layout:

- Left or central area: module sequence / roadmap view
- Right side: selected module preview
- Bottom or secondary panel: resources, prerequisites, and next steps

The roadmap can become interactive over time. We can support clicking modules first, then add canvas-like movement later only if it improves usability.

A fully draggable canvas is optional, not required for the first version. If we build it, it must still be readable, accessible, and useful on smaller screens.

## Module Page Or Module Panel Direction

A module can either be a dedicated page or a detailed panel inside the skill map experience. We should decide based on content depth.

A module should include:

- Goal
- Why it matters
- Mental model
- Topic sequence
- Curated resources
- Checklist
- Expected artifact or outcome
- AI handoff
- Raw markdown/context option

The module should not try to explain everything from scratch. It should provide enough framing to understand why the resources matter and how to use them.

## Topic Card Direction

Topic cards should be structured, compact, and practical.

A good topic card can include:

- What this is
- Why it matters
- When to care
- Recommended default
- Resources
- Checklist
- Done condition

Topic cards should support scanning. They should not become long essays.

## AI Handoff Direction

AI handoff is a first-class concept.

Visitors may not read everything manually. We should allow them to carry a module into their preferred AI assistant with useful context and instructions.

Possible actions:

- Copy AI context
- Open in ChatGPT
- Open in Claude
- View raw markdown
- Download context pack later

The handoff should include:

- Goal
- Module summary
- Topic sequence
- Prerequisites
- Resources
- Constraints
- Expected output
- Suggested questions for the AI to ask before acting

The AI handoff can appear near the top for quick access and near the bottom as a continuation action after reading.

## Raw Markdown Direction

Learn content should be available in a raw markdown or context-friendly form.

This should eventually apply to articles too, but learn modules benefit from it first because they are meant to be reused, copied, and handed to tools.

If MDX components make raw markdown difficult, we should separate core content from presentation where possible.

## Content Model Draft

We will likely need a dedicated content collection for learn content.

A possible first version:

```txt
content/learn/
  python-open-source-development/
    index.mdx
    open-source-project-setup.mdx
```

A possible future version:

```txt
content/learn-paths/
content/learn-modules/
content/learn-resources/
```

For the first implementation, avoid over-engineering. One collection can be enough if the schema is well-designed.

Possible module frontmatter fields:

```yaml
title: Open Source Project Setup
skillMap: python-open-source-development
order: 1
summary: Set up the project systems before writing serious code.
status: draft
difficulty: beginner
estimatedTime: 2-4 hours
outcome: A maintainable repository with tooling, CI, docs, and collaboration defaults.
prerequisites: []
tags: [open-source, tooling, automation]
topics:
  - id: repository-structure
    title: Repository Structure
    why: Make the project understandable before it grows.
  - id: package-manager
    title: Package Manager
    why: Make installation and execution repeatable.
```

## First Slice Recommendation

Start with one skill map and one strong module.

Skill map:

`Python Open Source Development`

First module:

`Open Source Project Setup`

Suggested topics:

- Repository structure
- Runtime and package manager
- Formatter
- Linter
- Type checking
- CI pipeline
- Documentation
- License
- Code of conduct
- AI project instructions

This proves the full system without requiring a large content library.

## Design Principles

- Curate first, explain only enough.
- Show why a topic matters before listing resources.
- Prefer clear sequencing over fancy visuals.
- Use interaction to orient the learner, not to decorate the page.
- Make content reusable by humans and AI tools.
- Keep the first version small enough to finish well.

## Open Decisions

- Should a module be a dedicated route, a panel inside a skill map, or both?
- How visual should the skill map be in version one?
- How should raw markdown/context packs be generated?
- Should AI handoff open external assistants directly or start with copy-to-clipboard?
- What is the minimum content schema that supports future growth without making the first version heavy?
