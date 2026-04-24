export interface PinnedProject {
  title: string
  description: string
  icon: string
  href: string
  external?: boolean
}

export const pinnedProjects: PinnedProject[] = [
  {
    title: 'CelestialDocs',
    description: 'Full-control documentation foundation built on Astro.',
    icon: 'telescope',
    href: 'https://github.com/HYP3R00T/CelestialDocs',
    external: true,
  },
  {
    title: 'homelab',
    description:
      'Production-grade self-hosted Kubernetes platform with GitOps.',
    icon: 'server',
    href: 'https://github.com/HYP3R00T/homelab',
    external: true,
  },
  {
    title: 'dotfiles',
    description:
      'Cross-platform zero-touch environment setup via Ansible & chezmoi.',
    icon: 'laptop',
    href: 'https://github.com/HYP3R00T/dotfiles',
    external: true,
  },
]
