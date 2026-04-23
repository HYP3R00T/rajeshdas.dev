import type { Attribute, HomepageIntentContent, Skill } from '@/lib/types'

export const skills: Skill[] = [
  {
    id: '01',
    title: 'CLOUD PLATFORMS',
    icon: 'cloud',
    items: ['AWS', 'Azure'],
  },
  {
    id: '02',
    title: 'CONTAINERS',
    icon: 'kubernetes',
    items: ['Docker', 'Kubernetes', 'Helm'],
  },
  {
    id: '03',
    title: 'CI/CD',
    icon: 'zap',
    items: ['GitHub Actions', 'Jenkins', 'FluxCD'],
  },
  {
    id: '04',
    title: 'VERSION CONTROL',
    icon: 'file-text',
    items: ['Git', 'GitHub'],
  },
  {
    id: '05',
    title: 'INFRASTRUCTURE AS CODE',
    icon: 'server',
    items: ['Terraform', 'Ansible'],
  },
  {
    id: '06',
    title: 'MONITORING',
    icon: 'monitor',
    items: ['Prometheus', 'Grafana'],
  },
]

export const homepageIntent: HomepageIntentContent = {
  eyebrow: 'Decision-Driven System',
  headline: 'Intent Grid',
  subheadline: 'Choose one direction and move.',
  routes: [
    {
      id: 'learn',
      title: 'Learn',
      audience: 'For learners and self-taught developers',
      outcome: 'Get a structured path to make better technical decisions.',
      description:
        'Start with high-leverage fundamentals and remove tutorial paralysis with opinionated guidance.',
      href: '/learn',
      ctaLabel: 'Start learning path',
      status: 'planned',
    },
    {
      id: 'projects',
      title: 'Projects',
      audience: 'For hiring managers and technical evaluators',
      outcome: 'See systems, tools, and execution quality directly.',
      description:
        'Explore practical projects focused on reliability, automation, and measurable engineering outcomes.',
      href: '/project',
      ctaLabel: 'View projects',
      status: 'ready',
    },
    {
      id: 'workflow',
      title: 'Thinking',
      audience: 'For developers improving how they work',
      outcome: 'Understand workflows, trade-offs, and system design habits.',
      description:
        'Read decision-centric articles on tooling, process, and building maintainable systems.',
      href: '/post',
      ctaLabel: 'Read articles',
      status: 'ready',
    },
    {
      id: 'contact',
      title: 'Collaborate',
      audience: 'For founders, teams, and engineering leaders',
      outcome: 'Discuss projects where execution and system thinking matter.',
      description:
        'Reach out for collaboration around developer platforms, automation, and delivery systems.',
      href: '/contact',
      ctaLabel: 'Start conversation',
      status: 'ready',
    },
  ],
}

export const attributes: Attribute[] = [
  {
    title: 'Automation First',
    icon: 'zap',
    description:
      'If it can be automated, it should be. Building tools that eliminate repetitive tasks.',
  },
  {
    title: 'Open Source',
    icon: 'code',
    description:
      'Contributing to the community and sharing knowledge through open-source projects.',
  },
  {
    title: 'Cloud Native',
    icon: 'git-branch',
    description:
      'Designing scalable, resilient infrastructure for modern distributed systems.',
  },
]
