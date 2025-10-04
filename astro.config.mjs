import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import AutoImport from "astro-auto-import";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  // Define the production site URL so Astro.site is available during build
  site: "https://rajeshdas.dev",
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          bypassInlineCode: false,
          keepBackground: false,
          defaultLang: "txt",
          showLineNumbers: true,
        },
      ],
    ],
    shikiConfig: {
      theme: "css-variables",
      defaultColor: false,
      //   theme: "dark-plus",
      //   theme: "catppuccin-mocha",
    },
  },
  integrations: [
    AutoImport({
      imports: ["./src/components/core/Video.astro"],
    }),
    mdx(),
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
});
