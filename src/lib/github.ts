import type { PinnedProject } from '@data/pinned-projects'

export interface ContribDay {
  date: string
  count: number
}

export interface RepoStats {
  stars: number
  forks: number
  language: string
}

export interface ProjectWithStats extends PinnedProject {
  stars: number
}

/** Group daily contributions into ISO week buckets and return the last `weeks` weeks as a grid.
 *  Each row = one week (oldest → newest, top → bottom).
 *  Each column = one day (Mon=0 … Sun=6).
 */
export function buildContribGrid(
  contributions: ContribDay[],
  weeks = 16,
): {
  grid: (ContribDay | null)[][]
  rowLabels: (string | null)[]
  totalContribs: number
  maxCount: number
} {
  const weekMap = new Map<string, ContribDay[]>()

  for (const day of contributions) {
    const d = new Date(day.date + 'T00:00:00Z')
    const dow = (d.getUTCDay() + 6) % 7 // 0=Mon … 6=Sun
    const thursday = new Date(d)
    thursday.setUTCDate(d.getUTCDate() + (3 - dow))
    const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1))
    const weekNum = Math.ceil(
      ((thursday.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    )
    const key = `${thursday.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`
    if (!weekMap.has(key)) weekMap.set(key, [])
    weekMap.get(key)?.push(day)
  }

  const sortedWeeks = [...weekMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-weeks)

  const grid: (ContribDay | null)[][] = sortedWeeks.map(([, days]) => {
    const slots: (ContribDay | null)[] = Array(7).fill(null)
    for (const day of days) {
      const d = new Date(day.date + 'T00:00:00Z')
      const dow = (d.getUTCDay() + 6) % 7
      slots[dow] = day
    }
    return slots
  })

  const rowLabels: (string | null)[] = sortedWeeks.map(([, days], i) => {
    const firstDay = [...days].sort((a, b) => a.date.localeCompare(b.date))[0]
    if (!firstDay) return null
    const month = new Date(firstDay.date + 'T00:00:00Z').getUTCMonth()
    if (i === 0) {
      return new Date(firstDay.date + 'T00:00:00Z').toLocaleDateString(
        'en-US',
        {
          month: 'short',
          timeZone: 'UTC',
        },
      )
    }
    const prevFirst = [...sortedWeeks[i - 1][1]].sort((a, b) =>
      a.date.localeCompare(b.date),
    )[0]
    if (!prevFirst) return null
    const prevMonth = new Date(prevFirst.date + 'T00:00:00Z').getUTCMonth()
    if (month !== prevMonth) {
      return new Date(firstDay.date + 'T00:00:00Z').toLocaleDateString(
        'en-US',
        {
          month: 'short',
          timeZone: 'UTC',
        },
      )
    }
    return null
  })

  const totalContribs = contributions.reduce((s, c) => s + c.count, 0)
  const maxCount = Math.max(1, ...contributions.map((c) => c.count))

  return { grid, rowLabels, totalContribs, maxCount }
}

/** Map a contribution count to an intensity level 0–4. */
export function contribIntensity(count: number, maxCount: number): number {
  if (count === 0) return 0
  const ratio = count / maxCount
  if (ratio <= 0.15) return 1
  if (ratio <= 0.4) return 2
  if (ratio <= 0.7) return 3
  return 4
}

/** Merge pinned projects with their fetched star counts. */
export function mergeProjectStats(
  projects: PinnedProject[],
  repoStatsMap: Record<string, RepoStats>,
): ProjectWithStats[] {
  return projects.map((p) => ({
    ...p,
    stars: p.repo ? (repoStatsMap[p.repo]?.stars ?? 0) : 0,
  }))
}
