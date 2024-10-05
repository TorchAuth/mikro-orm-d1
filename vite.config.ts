import { defineConfig } from "vite";
import { globals, plugins } from "./vite.util";

export default defineConfig({
  build: {
    lib: { entry: "./src/index.ts", name: "mikro-d1" },
    outDir: "./dist",
    rollupOptions: {
      external: Object.keys(globals),
      output: {
        globals,
      },
    },
  },
  plugins: plugins,
});
