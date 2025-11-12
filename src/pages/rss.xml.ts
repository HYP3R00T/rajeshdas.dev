import type { PostEntry, Posts } from "@/lib/types";
import { getSortedPosts } from "@/lib/utils";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@data/config";

export async function GET(context: { site: string }) {
    const posts: Posts = await getCollection("posts");
    const sortedPosts: Posts = getSortedPosts(posts);
    return rss({
        title: SITE.title,
        description: SITE.description,
        site: context.site || "http://localhost:4321",
        items: sortedPosts.map((post: PostEntry) => ({
            title: post.data.title,
            pubDate: post.data.pubDatetime,
            description: post.data.description,
            link: `/post/${post.id}`,
        })),
        stylesheet: "/rss/styles.xsl",
        customData: `<language>en-us</language>`,
    });
}
