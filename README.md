# mikro-orm-d1

The repo is a Mikro-ORM plugin that allows usage of Cloudflare D1.

## Example

```ts
import { MikroORM } from '@mikro-orm/core';
import { User } from './test.entity';

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const mikro = await MikroORM.init({
      debug: true,
      dbName: 'd1',
      entities: [User],
      driverOptions: {
        connection: {
          database: env.MY_DB,
        },
      },
    });
    return new Response('Hello World!');
  },
} satisfies ExportedHandler<Env>;
```

## Issues

- Cloudflare requires native `node` libs to be prefixed with `node:`
  - Tons of older libraries utilized in Mikro-ORM don't do this
  - Mikro-ORM also doesn't do this
  - This prevents even local development with Mikro-ORM
- Using `require` on ESM modules breaks `@cloudflare/vitest-pool-workers` so testing is difficult and can only be done via the deprecated `vitest-environment-miniflare`
  - Mikro-ORM seems to do this for `@mikro-orm/knex`
