import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

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
      ogImage: image().optional(),
      ogImageAlt: z.string().optional(),
    }),
})

const learnBaseSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["ready", "draft", "planned"]),
  order: z.number(),
  pubDatetime: z.date().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

const learn = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/learn" }),
  schema: ({ image }) =>
    z.discriminatedUnion("kind", [
      learnBaseSchema.extend({
        kind: z.literal("skill-map"),
        outcome: z.string(),
        cover: image(),
        coverAlt: z.string().optional(),
        ogImage: image(),
        ogImageAlt: z.string().optional(),
      }),
      learnBaseSchema.extend({
        kind: z.literal("module"),
        summary: z.string(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        ogImage: image().optional(),
        ogImageAlt: z.string().optional(),
        progressStatus: z.enum(["completed", "work-in-progress", "updated"]).default("completed"),
        progressNote: z.string().optional(),
        prerequisites: z.array(z.string()).default([]),
      }),
    ]),
})

const til = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/til" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      topic: z.string(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().optional().default(false),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      ogImage: image().optional(),
      ogImageAlt: z.string().optional(),
    }),
})

export const collections = { posts, learn, til }
