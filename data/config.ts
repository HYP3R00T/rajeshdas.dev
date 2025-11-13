import setupImage from "@/assets/setup.png";
import type { NavItem, SocialObjects } from "@/lib/types";

export const SITE = {
    website: "https://rajeshdas.dev",
    author: "Rajesh",
    repo: "https://github.com/HYP3R00T/rajeshdas.dev",
    branch: "master",
    title: "rajeshdas",
    description:
        "A portfolio and blog showcasing Rajesh's skills in DevOps, Python, and Cloud.",
    image: setupImage,
    imageAlt: "Check out rajeshdas.dev",
    contentType: "Portfolio",
    twitterHandle: "@HYP3R00T",
    pageSize: 10,
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
    lang: "en",
};

export const navItems: NavItem[] = [
    //   { href: "/about", label: "About" },
    { href: "/post", label: "Blog" },
    { href: "https://hyperoot.dev/", label: "Projects", blank: true },
    { href: "/activity", label: "Activity" },
    // { href: "/components", label: "Components" },
    // { href: "/about", label: "About" },
    { href: "/resume.pdf", label: "Resume", blank: true },
    { href: "/contact", label: "Let's Talk", special: true },
];

export const Socials: SocialObjects[] = [
    {
        name: "mail",
        href: "mailto:rajesh@hyperoot.dev",
        linkTitle: `Mail me`,
        active: true,
    },
    {
        name: "github",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `Checkout my GitHub profile`,
        active: true,
    },
    {
        name: "facebook",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `${SITE.title} on Facebook`,
        active: false,
    },
    {
        name: "instagram",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `${SITE.title} on Instagram`,
        active: false,
    },
    {
        name: "linkedin",
        href: "https://www.linkedin.com/in/rajesh-kumar-das/",
        linkTitle: `Connect with me on LinkedIn`,
        active: true,
    },
    {
        name: "x",
        href: "https://x.com/HYP3R00T",
        linkTitle: `${SITE.title} on Twitter`,
        active: false,
    },
    {
        name: "twitch",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `${SITE.title} on Twitch`,
        active: false,
    },
    {
        name: "youtube",
        href: "https://www.youtube.com/@hyperoot",
        linkTitle: `Watch me on YouTube`,
        active: true,
    },
    {
        name: "discord",
        href: "https://discord.gg/tWZRBhaPhd",
        linkTitle: `${SITE.title} on Discord`,
        active: false,
    },
    {
        name: "gitlab",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `${SITE.title} on GitLab`,
        active: false,
    },
    {
        name: "reddit",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `${SITE.title} on Reddit`,
        active: false,
    },
    {
        name: "telegram",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `${SITE.title} on Telegram`,
        active: false,
    },
    {
        name: "mastodon",
        href: "https://mastodon.social/@hyp3r00t",
        linkTitle: `${SITE.title} on Mastodon`,
        active: false,
    },
    {
        name: "rss",
        href: "/rss.xml",
        linkTitle: `Subscribe to my blogs via RSS`,
        active: true,
    },
    {
        name: "resume",
        href: "/resume.pdf",
        linkTitle: "Looking for my Resume?",
        active: false,
    },
];

export const Skills = [
    {
        icon: "kubernetes",
        icon_class: "text-blue",
        title: "Kubernetes & Containerization",
        category: "Infrastructure",
        description:
            "Expertise in deploying and managing containerized applications using Docker and Kubernetes",
    },
    {
        icon: "git-branch",
        icon_class: "text-red",
        title: "GitOps & CI/CD",
        category: "DevOps",
        description:
            "ArgoCD, Flux, Tekton pipelines with automated testing, security scanning, and progressive deployments",
    },
    {
        icon: "linux",
        icon_class: "text-yellow",
        title: "Linux & Bash Scripting",
        category: "Operating Systems",
        description:
            "ArgoCD, Flux, Tekton pipelines with automated testing, security scanning, and progressive deployments",
    },
    {
        icon: "github",
        icon_class: "text-pink",
        title: "Cloud Platforms",
        category: "DevOps",
        description:
            "ArgoCD, Flux, Tekton pipelines with automated testing, security scanning, and progressive deployments",
    },
    {
        icon: "github",
        icon_class: "text-green",
        title: "GitOps & CI/CD",
        category: "DevOps",
        description:
            "ArgoCD, Flux, Tekton pipelines with automated testing, security scanning, and progressive deployments",
    },
];
