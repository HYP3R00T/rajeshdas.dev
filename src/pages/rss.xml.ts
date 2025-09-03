import { getSortedPosts } from "@/lib/utils";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "config";

export async function GET(context: { site: any }) {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDatetime,
      description: post.data.description,
      link: `/article/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
