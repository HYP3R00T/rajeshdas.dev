import type { CollectionEntry } from "astro:content";
import { SITE } from "@data/config";
import type { Posts } from "@/lib/types";

// Helper function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const postFilter = ({ data }: CollectionEntry<"posts">) => {
    const isPublishTimePassed =
        Date.now() >
        new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
    return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export const getSortedPosts = (posts: Posts) => {
    return posts
        .filter(postFilter)
        .sort(
            (a, b) =>
                Math.floor(
                    new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000,
                ) -
                Math.floor(
                    new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000,
                ),
        );
};

export function formatDate(
    dateString: string | Date,
    locale = "en-US",
    options?: Intl.DateTimeFormatOptions,
) {
    const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;

    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short", // "May"
        day: "numeric", // 21
        ...options,
    });
}
