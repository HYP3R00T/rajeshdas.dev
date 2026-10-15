export const homepageMetrics = [
  {
    value: "87.5%",
    unit: "less time",
    label: "Regression testing reduced through AWS workflow automation",
  },
  {
    value: "70%",
    unit: "less manual effort",
    label: "Heterogeneous database validation made repeatable",
  },
  {
    value: "8",
    unit: "engineers",
    label: "Trained in maintainable Python automation practices",
  },
  {
    value: "20k+",
    unit: "downloads",
    label: "Public adoption of the HyperCLI Python package",
  },
] as const

export const homepageStorySteps = [
  {
    shape: "sphere",
    visualLabel: "Sphere",
    eyebrow: "Understand",
    title: "I understand the workflow before I automate it.",
    description:
      "Repetition is easy to spot. The harder part is finding out why it exists: where information comes from, which checks matter, where people wait, and what still needs human judgment.",
    supporting:
      "I map that path before writing the automation. A faster script is not much help if the underlying process is still difficult to understand.",
  },
  {
    shape: "cube",
    visualLabel: "Cube",
    eyebrow: "Build",
    title: "The happy path is only the beginning.",
    description:
      "Real tools have to deal with changing configuration, unavailable services, partial results, and inputs nobody expected.",
    supporting:
      "I build logging, validation, tests, and useful errors into the workflow from the start, so the person running it can see what happened and decide what to do next.",
  },
  {
    shape: "pyramid",
    visualLabel: "Pyramid",
    eyebrow: "Handoff",
    title: "The system should make sense without me.",
    description:
      "Automation becomes useful when another engineer can run it, diagnose it, and change it without relying on the person who wrote the first version.",
    supporting:
      "That means reproducible environments, documentation, delivery pipelines, and enough context for the next person to take responsibility for the work.",
  },
] as const

export const homepageRoutes = [
  {
    eyebrow: "Guided learning",
    title: "Learn",
    description: "Work through sequential modules built around practical decisions and useful outcomes.",
    href: "/learn/",
    action: "Explore skill maps",
  },
  {
    eyebrow: "Long-form thinking",
    title: "Articles",
    description: "Read detailed explanations of engineering systems, decisions, implementation, and tradeoffs.",
    href: "/post/",
    action: "Browse articles",
  },
] as const

export const latestVideo = {
  id: "v_rcTD2O-aU",
  title: "Latest video from Hyperoot",
  channelUrl: "https://www.youtube.com/@hyperoot",
} as const

// Opening copy for the personal homepage.
export const homepageIntro = {
  role: "Python & DevOps Automation Engineer",
  headline: ["Less manual work.", "More room to build."],
  description:
    "I’m Rajesh. I build Python automation, developer tools, and infrastructure workflows that turn repetitive work into something you can run, understand, and trust.",
} as const
