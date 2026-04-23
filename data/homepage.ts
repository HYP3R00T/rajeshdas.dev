import type { Skill } from '@/lib/types'

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
