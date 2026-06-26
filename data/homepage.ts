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
    label: "setup hours reclaimed",
    detail: "Dotfiles bootstrap runs replace slow manual machine setup with a repeatable path measured in minutes.",
    source: "dotfiles counter",
    icon: "server",
    strength: "strong",
  },
  {
    value: "20k+",
    unit: "downloads",
    label: "Python package downloads",
    detail: "Public packages and automation utilities used outside my own machines.",
    source: "package telemetry",
    icon: "download",
    strength: "strong",
  },
  {
    value: "17",
    unit: "articles",
    label: "field notes published",
    detail: "Technical notes turning implementation decisions into reusable context.",
    source: "content collection",
    icon: "file-text",
    strength: "supporting",
  },
  {
    value: "3",
    unit: "systems",
    label: "public proof points",
    detail: "Project entry points across reproducible environments, documentation, and voice-first tooling.",
    source: "featured work",
    icon: "code",
    strength: "supporting",
  },
  {
    value: "1",
    unit: "workflow",
    label: "CI workflow tracked here",
    detail: "This site ships with an explicit pull-request workflow; broader automation proof can connect later.",
    source: ".github/workflows",
    icon: "pipeline",
    strength: "supporting",
  },
] as const

export const latestVideo = {
  id: "v_rcTD2O-aU",
  channelUrl: "https://www.youtube.com/@hyperoot",
} as const
