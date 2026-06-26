import type { CollectionEntry } from "astro:content"

export type LearnEntry = CollectionEntry<"learn">

export const getSkillMapSlug = (entry: LearnEntry) => entry.id.replace(/\/index$/, "")

export const getModuleSlug = (entry: LearnEntry) => entry.id.split("/").at(-1) ?? entry.id

export const getModuleSkillMapSlug = (entry: LearnEntry) => entry.id.split("/").slice(0, -1).join("/")

export const isSkillMapEntry = (entry: LearnEntry) => entry.data.kind === "skill-map"

export const isModuleEntry = (entry: LearnEntry) => entry.data.kind === "module"
