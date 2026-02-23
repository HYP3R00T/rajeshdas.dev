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
        items: ["AWS", "Azure", "GCP", "DigitalOcean"],
    },
    {
        id: "02",
        title: "CONTAINERS",
        icon: "kubernetes",
        items: ["Docker", "Kubernetes", "Helm", "Podman"],
    },
    {
        id: "03",
        title: "CI/CD",
        icon: "zap",
        items: ["GitHub Actions", "Jenkins", "GitLab CI", "ArgoCD"],
    },
    {
        id: "04",
        title: "VERSION CONTROL",
        icon: "file-text",
        items: ["Git", "GitHub", "GitLab", "Bitbucket"],
    },
    {
        id: "05",
        title: "INFRASTRUCTURE AS CODE",
        icon: "server",
        items: ["Terraform", "Ansible", "CloudFormation", "Pulumi"],
    },
    {
        id: "06",
        title: "MONITORING",
        icon: "monitor",
        items: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
    },
    {
        id: "07",
        title: "MONITORING",
        icon: "monitor",
        items: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
    },
    {
        id: "08",
        title: "MONITORING",
        icon: "monitor",
        items: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
    },
];
