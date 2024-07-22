/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

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
