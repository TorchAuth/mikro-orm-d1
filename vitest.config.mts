import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import { globals, plugins } from "./vite.util";

export default defineWorkersConfig({
  resolve: {
    conditions: ["browser"],
  },
  build: {
    rollupOptions: {
      external: Object.keys(globals),
      output: {
        globals,
      },
    },
  },
  plugins: plugins,
  test: {
    poolOptions: {
      workers: {
        main: "./test/worker/test.worker.ts",
        wrangler: { configPath: "./test/worker/wrangler.toml" },
      },
    },
  },
});
