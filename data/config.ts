import placeholder1 from '@/assets/placeholder1.png'
import type { NavItem, SiteConfig } from '@/lib/types'

export const SITE: SiteConfig = {
  website: 'https://rajeshdas.dev',
  author: 'Rajesh',
  repo: 'https://github.com/HYP3R00T/rajeshdas.dev',
  title: 'Rajesh Das',
  description:
    'A personal portfolio and value-first router for self-directed developers who want structure, practical systems, and curated guidance.',
  image: placeholder1,
  imageAlt: 'Check out rajeshdas.dev',
  contentType: 'Portfolio',
  twitterHandle: '@HYP3R00T',
  pageSize: 10,
  lang: 'en',
}

export const navItems: NavItem[] = [
  { href: '/post', label: 'Blog' },
  { href: '/project', label: 'Projects' },
  { href: '/contact', label: 'Contacts' },
]

export const SOCIAL_LINKS = [
  {
    name: 'github',
    href: 'https://github.com/HYP3R00T',
    active: true,
    linkTitle: 'Visit my GitHub profile',
  },
  {
    name: 'linkedin',
    href: 'https://linkedin.com/in/rajesh-kumar-das',
    active: true,
    linkTitle: 'Connect with me on LinkedIn',
  },
  {
    name: 'mail',
    href: 'mailto:hello@rajeshdas.dev',
    active: true,
    linkTitle: 'Send me an email',
  },
]
