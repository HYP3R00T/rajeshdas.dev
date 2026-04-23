import type { Attribute, HomepageIntentContent, Skill } from '@/lib/types'

// Legacy exports kept for compatibility with existing homepage components.
export const attributes: Attribute[] = []
export const skills: Skill[] = []

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
