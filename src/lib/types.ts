import type { Page, MarkdownHeading } from "astro";
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

// For src/pages/post/[...page].astro
export interface PostsPageProps {
  page: Page<CollectionEntry<"posts">>;
  totalPages: number;
}

// Reusable types for posts collections
export type PostEntry = CollectionEntry<"posts">;
export type Posts = PostEntry[];

// Post data and headings
export type PostData = PostEntry["data"];
export type PostHeadings = MarkdownHeading[];

// For src/pages/post/[...slug].astro
export interface PostDetailPageProps {
  entry: PostEntry;
  headings: PostHeadings;
}

export interface PostPath {
  params: { slug: string };
  props: PostDetailPageProps;
}

// For src/layouts/BaseLayout.astro
// Accepts any subset of SEO props; HeadSEO provides sensible defaults.
export interface BaseLayoutProps extends Partial<HeadSEOProps> {}

// For src/pages/tag/[tag]/index.astro
export interface TagPageProps {
  tag: string;
  posts: Posts;
}
