# mikro-orm-d1

The repo is a Mikro-ORM plugin that allows usage of Cloudflare D1.

## Example

```ts
import { MikroORM } from "@mikro-orm/core";
import { User } from "./test.entity";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const mikro = await MikroORM.init({
			debug: true,
			dbName: "d1",
			entities: [User],
			driverOptions: {
				connection: {
					database: env.MY_DB,
				},
			},
		});
		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
```

## Issues

There is a fundamental incompatibility between parts of Mikro-ORM and it's dependencies with the `workerd` runtime. Here's a brain-dump of what I've seen thus far:

- Cloudflare requires native `node` libs to be prefixed with `node:`
  - Tons of older libraries utilized in Mikro-ORM don't do this
  - ~~Mikro-ORM also doesn't do this~~
  - This prevents even local development with Mikro-ORM
- Using `require` on ESM modules breaks `@cloudflare/vitest-pool-workers` so testing is difficult and can only be done via the deprecated `vitest-environment-miniflare`
  - Mikro-ORM seems to do this for `@mikro-orm/knex`
- Mikro-ORM includes a bunch of node filesystem logic for finding templates
  - AFAIK, there isn't a way to exclude this from the final build
  - Most CF-incompatible imports come from the area

## Experiments

- Adding a small Vite plugin (`nodePrefixRewrite`) to rewrite all native node module imports to utilize prefixes squelches all errors related to `node:`
  - Non-CF compatible imports still cause `workerd` to fail
- Trying to set globals for all available native node modules available in `workerd`
  - Any modules not available would simply be polyfilled to cover up any errors
  - Haven't gotten this to work just yet
