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

export const collections = { posts };
