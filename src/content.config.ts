import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      featured: z.boolean().optional().default(false),
      draft: z.boolean().optional().default(false),
      category: z.string().optional(),
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
      summary: z.string(),
      description: z.string().optional(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      featured: z.boolean().optional().default(false),
      draft: z.boolean().optional().default(false),
      readMore: z.boolean().optional().default(false),
      cover: image(),
      coverAlt: z.string().optional(),
      logo: image().optional(),
      gallery: z.array(image()).optional(),
      links: z
        .object({
          homepage: z.string().url().optional(),
          repo: z.string().url().optional(),
          docs: z.string().url().optional(),
          demo: z.string().url().optional(),
          video: z.string().url().optional(),
          package: z.string().url().optional(),
        })
        .optional(),
    }),
});

export const collections = { posts, projects };
