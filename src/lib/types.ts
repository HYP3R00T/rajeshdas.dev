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
  branch?: string;
  title: string;
  description: string;
  image: string | ImageMetadata;
  imageAlt?: string;
  twitterHandle?: string;
  starCountThreshold?: number;
  enableLayoutWidthToggle?: boolean;
  enableGitHubButton?: boolean;
  defaultDocRedirect?: string;
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
