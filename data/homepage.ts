export const featuredProjects = [
  {
    title: "Dotfiles",
    label: "Reproducible environments",
    body: "A one-command machine setup workflow for devcontainers, WSL, and cloud VMs.",
    href: "https://dotfiles.hyperoot.dev/",
  },
  {
    title: "Celestial Docs",
    label: "Documentation systems",
    body: "A static docs system built for customization, free hosting, and source-level ownership.",
    href: "https://celestialdocs.hyperoot.dev/",
  },
  {
    title: "HyperCLI",
    label: "Python tooling",
    body: "A menu-driven CLI framework shaped around repeatable local and enterprise workflow automation.",
    href: "https://hyperoot.dev/",
  },
  {
    title: "Bootstrap Scripts",
    label: "Developer setup",
    body: "Linux bootstrap automation that turns a fresh machine into a usable engineering environment faster.",
    href: "https://hyperoot.dev/",
  },
  {
    title: "Learning Systems",
    label: "Technical education",
    body: "Structured technical writing and learning paths that make infrastructure and tooling easier to understand.",
    href: "https://rajeshdas.dev/post/",
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
    value: "5",
    unit: "systems",
    label: "public proof points",
    detail: "Project entry points across infrastructure, documentation, tooling, and learning systems.",
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

export const focusAreas = ["Developer environments", "Automation workflows", "Python tooling", "Technical writing"]

export const latestVideo = {
  id: "v_rcTD2O-aU",
  channelUrl: "https://www.youtube.com/@hyperoot",
} as const
