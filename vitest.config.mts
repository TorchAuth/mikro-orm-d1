import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
  resolve: {
    conditions: ['browser'],
  },
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: './test/worker/wrangler.toml' },
      },
    },
  },
});
