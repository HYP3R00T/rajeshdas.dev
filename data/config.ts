import setupImage from "@/assets/setup.png";
import type {
    LocaleConfig,
    NavItem,
    SiteConfig,
    SocialObjects,
    FooterNavItem,
    FooterSocialLink,
} from "@/lib/types";

export const LOCALE: LocaleConfig = {
    lang: "en",
};

export const SITE: SiteConfig = {
    website: "https://rajeshdas.dev",
    author: "Rajesh",
    repo: "https://github.com/HYP3R00T/rajeshdas.dev",
    title: "Rajesh Das",
    description:
        "A portfolio and blog showcasing Rajesh's skills in DevOps, Python, and Cloud.",
    image: setupImage,
    imageAlt: "Check out rajeshdas.dev",
    contentType: "Portfolio",
    twitterHandle: "@HYP3R00T",
    pageSize: 10,
};

export const navItems: NavItem[] = [
    { href: "/post", label: "Blog" },
    { href: "https://hyperoot.dev/", label: "Projects", blank: true },
    // { href: "/project", label: "Projects" },
    // { href: "/components", label: "Components" },
    // { href: "/about", label: "About" },
];

export const SOCIAL_LINKS: SocialObjects[] = [
    {
        name: "github",
        href: "https://github.com/HYP3R00T/",
        linkTitle: `Checkout my GitHub profile`,
        active: true,
    },
];

// Footer navigation items
export const footerNavigation: FooterNavItem[] = [
    // { href: "#skills", label: "Skills" },
    // { href: "#projects", label: "Projects" },
    { href: "/post/", label: "Blog" },
    // { href: "#contact", label: "Contact" },
];

// Footer social links
export const footerSocialLinks: FooterSocialLink[] = [
    {
        name: "github",
        href: "https://github.com/HYP3R00T",
        label: "GitHub",
        linkTitle: "Visit my GitHub profile",
    },
    {
        name: "linkedin",
        href: "https://linkedin.com/in/rajesh-kumar-das",
        label: "LinkedIn",
        linkTitle: "Connect with me on LinkedIn",
    },
    {
        name: "mail",
        href: "mailto:hello@rajeshdas.dev",
        label: "Email",
        linkTitle: "Send me an email",
    },
];
