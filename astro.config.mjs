// @ts-check

import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import AutoImport from "astro-auto-import"
import icon from "astro-icon"
import rehypeHeadingLinks from "./src/lib/rehype-heading-links.mjs"

export default defineConfig({
  site: "https://rajeshdas.dev",
  prefetch: true,

  markdown: {
    processor: unified({ rehypePlugins: [rehypeHeadingLinks] }),
    shikiConfig: {
      theme: "poimandres",
    },
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
    mdx(),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
