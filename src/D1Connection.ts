import { BetterSqliteConnection } from "@mikro-orm/better-sqlite";
import Client_D1 from "@torchauth/knex-cloudflare-d1";

/**
 * @inheritDoc
 */
export class D1Connection extends BetterSqliteConnection {
	override async createKnex() {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		this.client = this.createKnexClient(Client_D1 as any);
		this.connected = true;
	}

	override async connect() {
		this.createKnex();
	}

	override async isConnected() {
		return this.connected;
	}
}
