import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/posts" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDatetime: z.date(),
            featured: z.boolean().optional().default(false),
            draft: z.boolean().optional().default(false),
            tags: z.array(z.string()).default([]),
            cover: image(),
            coverAlt: z.string().optional(),
        }),
});

const components = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/components" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(["ui", "layout", "form"]).default("ui"),
        order: z.number().default(999),
        draft: z.boolean().optional().default(false),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/projects" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        technologies: z.array(z.string()).default([]),
        featured: z.boolean().optional().default(false),
        draft: z.boolean().optional().default(false),
        order: z.number().default(999),
    }),
});

export const collections = { posts, components, projects };
