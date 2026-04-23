import type { CollectionEntry } from 'astro:content'
import type { ImageMetadata, MarkdownHeading } from 'astro'

// For HeadSEO.astro
export interface HeadSEOProps {
  title: string
  description: string
  image: string | ImageMetadata
  imageAlt: string
  contentType: string
  noIndex?: boolean
}

// For src/layouts/BaseLayout.astro
// Accepts any subset of SEO props; HeadSEO provides sensible defaults.
export interface BaseLayoutProps extends Partial<HeadSEOProps> {}

// Site-level configuration
export interface SiteConfig {
  website: string
  author: string
  repo: string
  title: string
  description: string
  image: string | ImageMetadata
  imageAlt?: string
  contentType: string
  twitterHandle?: string
  pageSize?: number
  lang: string
}

// Navigation item in the header navigation
export interface NavItem {
  href: string
  label: string
  special?: boolean
  blank?: boolean
}

// Footer navigation item
export interface FooterNavItem {
  href: string
  label: string
  blank?: boolean
}

// Social media link configuration
export interface SocialObjects {
  name: string
  href: string
  active: boolean
  linkTitle?: string
}

// Footer social link configuration
export interface FooterSocialLink {
  name: string
  href: string
  label: string
  linkTitle: string
}

// Posts / content types
export type PostEntry = CollectionEntry<'posts'>
export type Posts = PostEntry[]

export interface PostsPageProps {
  page: {
    data: PostEntry[]
    currentPage: number
    pageSize: number
    url: {
      first?: string
      prev?: string
      next?: string
      last?: string
    }
  }
  totalPages?: number
  featured?: PostEntry
}

export interface PostPath {
  params: { slug: string }
  props: { entry: PostEntry; headings: MarkdownHeading[] }
}

export interface PostDetailPageProps {
  entry: PostEntry
  headings: MarkdownHeading[]
}

export interface PostCardProps {
  post: PostEntry
}

// Homepage attributes
export interface Attribute {
  title: string
  icon: string
  description: string
}

// Homepage skills
export interface Skill {
  id: string
  title: string
  icon: string
  items: string[]
}

// Homepage intent-router content model
export interface IntentRoute {
  id: string
  title: string
  audience: string
  outcome: string
  description: string
  href: string
  ctaLabel: string
  status?: 'ready' | 'planned'
}

export interface HomepageIntentContent {
  eyebrow: string
  headline: string
  subheadline: string
  routes: IntentRoute[]
}
