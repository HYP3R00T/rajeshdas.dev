import setupImage from "@/assets/setup.png";
import type {
  LocaleConfig,
  NavItem,
  SiteConfig,
  SocialObjects,
} from "@/lib/types";

export const LOCALE: LocaleConfig = {
  lang: "en",
};

export const SITE: SiteConfig = {
  website: "https://celestialdocs.hyperoot.dev",
  author: "Rajesh",
  repo: "https://github.com/HYP3R00T/CelestialDocs",
  title: "CelestialDocs",
  description: "Documentation template using Astro and Shadcn",
  image: setupImage,
  imageAlt: "Check out celestialdocs.hyperoot.dev",
  twitterHandle: "@HYP3R00T",
  defaultDocRedirect: "/docs/getting-started/introduction",
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/docs", label: "Docs", special: true },
];

export const SOCIAL_LINKS: SocialObjects[] = [
  {
    name: "github",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `Checkout my GitHub profile`,
    active: true,
  },
];
