// @ts-check

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        shikiConfig: {
            themes: {
                light: "catppuccin-latte",
                dark: "catppuccin-mocha",
            },
        },
    },

    integrations: [
        icon({
            iconDir: "src/assets/icons",
        }),
        mdx(),
    ],
});
