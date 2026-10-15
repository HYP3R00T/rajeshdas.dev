import placeholder1 from "@/assets/placeholder1.png"
import type { NavItem, SiteConfig } from "@/lib/types"

export const SITE: SiteConfig = {
  website: "https://rajeshdas.dev",
  author: "Rajesh",
  repo: "https://github.com/HYP3R00T/rajeshdas.dev",
  title: "Rajesh Das",
  description: "Python automation, developer tools, CI/CD workflows, and infrastructure work from Rajesh Kumar Das.",
  image: placeholder1,
  imageAlt: "Check out rajeshdas.dev",
  contentType: "Portfolio",
  twitterHandle: "@HYP3R00T",
  pageSize: 12,
  lang: "en",
}

export const navItems: NavItem[] = [
  { href: "/post", label: "Articles" },
  { href: "https://hyperoot.dev", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export const LEARN_URL = "https://hyperootlabs.notion.site/devos"

export const SOCIAL_LINKS = [
  {
    name: "github",
    href: "https://github.com/HYP3R00T",
    active: true,
    linkTitle: "Visit my GitHub profile",
  },
  {
    name: "linkedin",
    href: "https://linkedin.com/in/rajesh-kumar-das",
    active: true,
    linkTitle: "Connect with me on LinkedIn",
  },
  {
    name: "mail",
    href: "mailto:hello@rajeshdas.dev",
    active: true,
    linkTitle: "Send me an email",
  },
]

// Shared by the desktop directory and mobile navigation panel.
export const sidebarGroups = [
  {
    label: "Links",
    items: [
      ...SOCIAL_LINKS.filter((link) => link.active).map((link) => ({
        href: link.href,
        icon: link.name,
        label:
          ({ github: "GitHub", linkedin: "LinkedIn", mail: "Email" } as Record<string, string>)[link.name] || link.name,
      })),
      { href: "/rss.xml", label: "RSS", icon: "rss" },
    ],
  },
]
