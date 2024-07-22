# mikro-orm-d1

The repo is a Mikro-ORM plugin that allows usage of Cloudflare D1.

## Issues

- Cloudflare requires native `node` libs to be prefixed with `node:`
  - Tons of older libraries utilized in Mikro-ORM don't do this
  - Mikro-ORM also doesn't do this
  - This prevents even local development with Mikro-ORM
- Using `require` on ESM modules breaks `@cloudflare/vitest-pool-workers` so testing is difficult and can only be done via the deprecated `vitest-environment-miniflare`
  - Mikro-ORM seems to do this for `@mikro-orm/knex`
