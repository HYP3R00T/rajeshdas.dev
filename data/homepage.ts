export const featuredProjects = [
  {
    title: "dotfiles",
    body: "A one-command machine setup workflow for devcontainers, WSL, and cloud VMs.",
    href: "https://dotfiles.hyperoot.dev/",
  },
  {
    title: "Celestial Docs",
    body: "A static docs system built for customization, free hosting, and source-level ownership.",
    href: "https://celestialdocs.hyperoot.dev/",
  },
  {
    title: "VoicePad",
    body: "A lightweight voice note workspace focused on capturing ideas quickly and turning them into usable text.",
    href: "https://voicepad.hyperoot.dev/",
  },
] as const

export const homepageMetrics = [
  {
    value: "700+",
    unit: "hours",
    label: "setup time reclaimed",
    source: "dotfiles counter",
  },
  {
    value: "20k+",
    unit: "downloads",
    label: "Python package reach",
    source: "package telemetry",
  },
  {
    value: "3",
    unit: "environments",
    label: "one bootstrap path",
    source: "dotfiles targets",
  },
  {
    value: "0",
    unit: "vendor lock-in",
    label: "source-owned documentation",
    source: "Celestial Docs",
  },
] as const

export const homepageRoutes = [
  {
    eyebrow: "Guided learning",
    title: "Learn",
    description: "Follow focused skill maps built around practical decisions and useful outcomes.",
    href: "/learn/",
    action: "Explore skill maps",
  },
  {
    eyebrow: "Long-form thinking",
    title: "Articles",
    description: "Read deeper explanations of engineering systems, tradeoffs, and implementation lessons.",
    href: "/post/",
    action: "Browse articles",
  },
  {
    eyebrow: "Small discoveries",
    title: "Notes",
    description: "Find concise observations and mental hooks worth keeping close.",
    href: "/til/",
    action: "Open notes",
  },
] as const

export const latestVideo = {
  id: "v_rcTD2O-aU",
  title: "Latest video from Hyperoot",
  channelUrl: "https://www.youtube.com/@hyperoot",
} as const
