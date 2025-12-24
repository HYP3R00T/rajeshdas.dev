import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

export default defineConfig({
    site: "https://rajeshdas.dev",
    prefetch: true,
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        shikiConfig: {
            theme: "css-variables",
            defaultColor: false,
        },
    },
    integrations: [
        icon({
            iconDir: "src/assets/icons",
        }),
        AutoImport({
            imports: ["./src/components/core/Video.astro"],
        }),
        mdx(),
    ],
});
