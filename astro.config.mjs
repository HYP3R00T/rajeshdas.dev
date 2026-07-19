// @ts-check

import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import AutoImport from "astro-auto-import"
import icon from "astro-icon"
import rehypeCodeBlocks from "./src/lib/rehype-code-blocks.mjs"
import rehypeHeadingLinks from "./src/lib/rehype-heading-links.mjs"

const rehypePlugins = [[rehypeCodeBlocks, { theme: "houston" }], rehypeHeadingLinks]

export default defineConfig({
  site: "https://rajeshdas.dev",
  prefetch: true,

  markdown: {
    processor: unified({
      rehypePlugins,
    }),
    syntaxHighlight: false,
  },

  integrations: [
    icon({
      iconDir: "src/assets/icons",
      svgoOptions: {
        plugins: [
          {
            name: "convertColors",
            params: {
              currentColor: true,
            },
          },
        ],
      },
    }),
    AutoImport({
      imports: [
        "./src/components/core/Video.astro",
        "./src/components/common/LinkPreview.astro",
        "./src/components/common/Callout.tsx",
      ],
    }),
    mdx({ rehypePlugins }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
