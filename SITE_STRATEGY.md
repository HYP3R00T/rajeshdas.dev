# Site Strategy

This document defines what `rajeshdas.dev` should become, why it should exist, and how we should improve it over time.

It is intentionally practical. The goal is to give us a stable reference before we redesign pages or add new sections.

## 1. Core Positioning

There are two public websites with different jobs:

- `rajeshdas.dev` is the personal brand, writing, learning, and trust-building site.
- `hyperoot.dev` is the project and engineering portfolio site.

This distinction is important.

`rajeshdas.dev` should answer:

- Who is Rajesh?
- How does he think?
- What kind of problems does he solve?
- What proof exists that he can deliver?
- Where should a visitor go next?

`hyperoot.dev` should answer:

- What has Rajesh built?
- How do those projects work?
- What tradeoffs were made?
- Where are the source code, docs, demos, and deeper implementation details?

## 2. What `rajeshdas.dev` Is Not

To keep the brand clear, `rajeshdas.dev` should not become:

- a duplicate of `hyperoot.dev`
- a generic resume website
- a tool-stack dump
- a random collection of links
- a second project catalog

If the site tries to do all of those things at once, the message will become weak.

## 3. What `rajeshdas.dev` Should Become

`rajeshdas.dev` should become a technical home base with four main functions:

1. Communicate identity and point of view.
2. Publish articles and curated learning content.
3. Show selected proof of skill through metrics and representative work.
4. Route visitors toward projects, contact, and learning paths.

Short version:

> `rajeshdas.dev` is the value-and-trust site.

## 4. Brand Thesis

The strongest current positioning is:

> Rajesh Das builds reproducible infrastructure, developer tooling, and automation systems that reduce friction, stay understandable, and respect cost, privacy, and long-term maintainability.

Important brand traits to reinforce:

- reproducibility
- automation-first problem solving
- local-first and privacy-aware tooling
- cost-conscious engineering
- clear documentation
- teaching through first principles

These traits are more memorable than a generic "DevOps Engineer" label.

## 5. Page Responsibilities

Each page should have a clear job.

### Home

Purpose:

- introduce Rajesh clearly
- explain what kind of work he does
- show proof quickly
- route visitors to the right next step

The homepage should answer within a few seconds:

- what do you build?
- why are you different?
- why should I trust you?
- where can I go next?

### Articles

Purpose:

- publish technical writing
- demonstrate clarity of thought
- create search and discovery value over time

Current state:

- already the strongest section in this repo

### Learn

Purpose:

- become a native learning system inside this site
- organize knowledge in a layered, curated way
- keep visitors inside the site ecosystem instead of sending them to Notion

This should eventually replace the current external Notion redirect.

### Contact

Purpose:

- convert interest into conversations
- support hiring, collaboration, and professional outreach

The contact page should feel intentional, not like an afterthought.

## 6. Information the Site Should Surface

The site should emphasize a small set of high-signal information.

### Identity

- who Rajesh is
- what he builds
- how he approaches engineering

### Credibility

- time saved
- adoption numbers
- usage counts
- downloads
- teams impacted
- open-source traction

### Representative Work

Selected project examples should support the message, not replace it.

Best candidates:

- Dotfiles / Linux Bootstrapper
- Celestial Docs
- HyperCLI
- Kubernetes / GitOps home lab
- VoicePad

### Writing and Teaching

- articles
- future learning modules
- selected videos only if they strengthen the brand

## 7. Information the Homepage Should Not Lead With

The homepage should not lead with:

- full resume details
- salary expectations
- notice period
- detailed job-search logistics
- every certification
- every technology ever used

Those may still matter elsewhere, but they should not dominate the brand story.

## 8. Metrics Strategy

Metrics are a strong differentiator for this site because Rajesh's work naturally produces measurable outcomes.

Examples of useful metrics:

- environments bootstrapped
- estimated hours saved
- PyPI downloads
- GitHub stars or forks for selected projects
- teams impacted
- articles published
- learning modules published

### Short-Term Approach

Use static values where needed so the UI and messaging can be designed now.

### Long-Term Approach

Create a central engineering telemetry source that can power live metrics across pages.

Potential future telemetry domains:

- bootstrap usage counts
- package download counts
- project adoption counts
- content publishing stats
- learning progress stats

The `dotfiles` counter endpoint is an early example of the right direction.

## 9. Learning Section Vision

The future Learn section should not be a note dump and should not feel like generic course content.

It should feel like a curated systems map.

Desired qualities:

- layered
- component-based
- navigable
- visual
- interactive where helpful
- based on mental models, not just topic lists

It should help visitors understand:

- foundations
- system layers
- common workflows
- progression paths
- what to learn next

The main promise is not "consume content."

The main promise is:

> understand the structure of the field and move with direction.

## 10. Content Architecture Direction

We should treat `rajeshdas.dev` as three connected content systems:

1. Identity system
   - homepage
   - about-style messaging
   - contact

2. Publishing system
   - blog posts
   - article index
   - tags and discovery

3. Learning system
   - curated guides
   - pathways
   - conceptual maps
   - interactive modules later

## 11. Prioritization Rules

We should improve the site in stages, starting with the highest impact and lowest ambiguity.

### First Fix What Is Easy and High Value

- homepage messaging hierarchy
- contact page clarity
- better routing between pages
- clearer calls to action
- stronger homepage proof blocks

### Then Build Medium-Complexity Structure

- metrics section
- selected work section that points to `hyperoot.dev`
- stronger article entry points
- native Learn landing page

### Then Build High-Complexity Systems

- dynamic telemetry
- interactive learning components
- structured learning architecture
- richer cross-linking between articles, learning modules, and projects

## 12. Phased Roadmap

### Phase 1: Strategy and Messaging

Goal:

- make the current site say the right things clearly

Tasks:

- define homepage message hierarchy
- define page roles
- define CTA structure
- define core proof points

### Phase 2: Quick Wins

Goal:

- improve perception without major system changes

Tasks:

- rewrite hero content
- improve homepage section order
- improve contact page copy and intent
- add a credibility / metrics strip using static values
- add stronger links to projects, articles, and learning

### Phase 3: Native Learn Foundation

Goal:

- move away from the Notion redirect and create a first-class Learn experience

Tasks:

- create internal Learn landing page
- define learning categories and progression
- map existing articles into learning pathways

### Phase 4: Dynamic Proof

Goal:

- make evidence feel alive and operational

Tasks:

- add telemetry-backed metrics
- centralize metric sources
- expose reusable stat components

### Phase 5: Richer Learning and Brand System

Goal:

- turn the site into a strong long-term knowledge and reputation engine

Tasks:

- interactive learning modules
- visual system maps
- deeper article-to-learning-to-project connections
- long-term editorial system

## 13. Near-Term Deliverables

The next concrete outputs should be:

1. a homepage content strategy
2. a homepage wireframe in words
3. a list of proof metrics and their initial values
4. a Learn section structure
5. a contact page rewrite strategy

## 14. Decision Filter

When evaluating a new homepage section or feature, ask:

- does this make the brand clearer?
- does this increase trust?
- does this help visitors understand what Rajesh does?
- does this support writing, learning, or proof?
- does this duplicate `hyperoot.dev`?

If it duplicates the portfolio site, it probably belongs there instead.

## 15. Current Guiding Principle

The immediate job is not to make the site bigger.

The immediate job is to make it sharper.

That means:

- clearer message
- better proof
- stronger routing
- stronger learning direction
- less duplication
