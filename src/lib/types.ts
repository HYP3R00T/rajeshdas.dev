import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";

// For HeadSEO.astro
export interface HeadSEOProps {
  title: string;
  description: string;
  image: string | ImageMetadata;
  imageAlt: string;
  contentType: string;
  noIndex?: boolean;
}

// Site-level configuration
export interface SiteConfig {
  website: string;
  author: string;
  repo: string;
  title: string;
  description: string;
  image: string | ImageMetadata;
  imageAlt?: string;
  contentType: string;
  twitterHandle?: string;
  pageSize?: number;
}

// Navigation item in the header navigation
export interface NavItem {
  href: string;
  label: string;
  special?: boolean;
  blank?: boolean;
}

// Social media link configuration
export interface SocialObjects {
  name: string;
  href: string;
  active: boolean;
  linkTitle?: string;
}

// Locale
export interface LocaleConfig {
  lang: string;
}

// Posts / content types
export type PostEntry = CollectionEntry<"posts">;
export type Posts = PostEntry[];

export interface PostPath {
  params: { slug: string };
  props: { entry: PostEntry; headings: any[] };
}

export interface PostDetailPageProps {
  entry: PostEntry;
  headings: any[];
}

export interface PostsPageProps {
  page: {
    data: PostEntry[];
    currentPage: number;
    pageSize: number;
    url: {
      first?: string;
      prev?: string;
      next?: string;
      last?: string;
    };
  };
  totalPages?: number;
  featured?: PostEntry;
}

export interface PostCardProps {
  post: PostEntry;
}

// For src/layouts/BaseLayout.astro
// Accepts any subset of SEO props; HeadSEO provides sensible defaults.
export interface BaseLayoutProps extends Partial<HeadSEOProps> {}
