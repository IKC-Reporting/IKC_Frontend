import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [
      ...configDefaults.exclude,
      "next.config.mjs",
      "postcss.config.js",
      "tailwind.config.ts",
    ],
    environment: "jsdom",
    coverage: {
      provider: "v8",
      exclude: [
        // says there is an error but that is not the case
        ...configDefaults.coverage.exclude,
        "next.config.mjs",
        "postcss.config.js",
        "tailwind.config.ts",
      ],
    },
  },
});
