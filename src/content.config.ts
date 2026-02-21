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

const projects = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/projects" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            technologies: z.array(z.string()).default([]),
            icon: z.string().optional(),
            featured: z.boolean().optional().default(false),
            draft: z.boolean().optional().default(false),
            order: z.number().default(999),
            images: z.array(image()).optional(),
            imageAlt: z.string().optional(),
            openSource: z.boolean().default(true),
            hasPage: z.boolean().optional().default(false),
        }),
});

export const collections = { posts, projects };
