import type { Attribute, Skill } from "@/lib/types";

export const attributes: Attribute[] = [
    {
        title: "Automation First",
        icon: "zap",
        description:
            "If it can be automated, it should be. Building tools that eliminate repetitive tasks.",
    },
    {
        title: "Open Source",
        icon: "code",
        description:
            "Contributing to the community and sharing knowledge through open-source projects.",
    },
    {
        title: "Cloud Native",
        icon: "git-branch",
        description:
            "Designing scalable, resilient infrastructure for modern distributed systems.",
    },
];

export const skills: Skill[] = [
    {
        id: "01",
        title: "CLOUD PLATFORMS",
        icon: "cloud",
        items: ["AWS", "Azure"],
    },
    {
        id: "02",
        title: "CONTAINERS",
        icon: "kubernetes",
        items: ["Docker", "Kubernetes", "Helm"],
    },
    {
        id: "03",
        title: "CI/CD",
        icon: "zap",
        items: ["GitHub Actions", "Jenkins", "FluxCD"],
    },
    {
        id: "04",
        title: "VERSION CONTROL",
        icon: "file-text",
        items: ["Git", "GitHub"],
    },
    {
        id: "05",
        title: "INFRASTRUCTURE AS CODE",
        icon: "server",
        items: ["Terraform", "Ansible"],
    },
    {
        id: "06",
        title: "MONITORING",
        icon: "monitor",
        items: ["Prometheus", "Grafana"],
    },
    {
        id: "07",
        title: "SCRIPTING",
        icon: "file-text",
        items: ["Python", "Bash", "PowerShell"],
    },
    {
        id: "08",
        title: "WEB DEVELOPMENT",
        icon: "monitor",
        items: ["Astro", "TailwindCSS", "ReactJS"],
    }
];
