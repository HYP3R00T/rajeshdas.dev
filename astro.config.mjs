import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import AutoImport from "astro-auto-import";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
  integrations: [
    // AutoImport({
    //   imports: ["./src/components/core/Card.astro"],
    // }),
    mdx(),
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
});
