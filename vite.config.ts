import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "postkit-ui-components",
      formats: ["cjs", "es"],
      fileName: (format) => {
        if (format === "cjs") return "index.js";
        if (format === "es") return "index.es.js";
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});