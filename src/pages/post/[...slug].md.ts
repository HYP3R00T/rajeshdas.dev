import { getCollection } from "astro:content"
import { SITE } from "@data/config"
import type { APIRoute, GetStaticPaths } from "astro"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft)
  return posts.map((entry) => ({
    params: { slug: entry.id },
    props: {
      markdown: [
        "---",
        `title: ${JSON.stringify(entry.data.title)}`,
        `description: ${JSON.stringify(entry.data.description)}`,
        `author: ${JSON.stringify(SITE.title)}`,
        `published: ${entry.data.pubDatetime.toISOString().slice(0, 10)}`,
        `source: ${JSON.stringify(new URL(`/post/${entry.id}/`, SITE.website).href)}`,
        "---",
        "",
        entry.body ?? "",
      ].join("\n"),
    },
  }))
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.markdown, {
    headers: {
      // Display the source in browsers rather than triggering a download.
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  })
