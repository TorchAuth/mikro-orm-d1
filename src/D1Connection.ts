import { BetterSqliteConnection } from "@mikro-orm/better-sqlite";
import Client_D1 from "@torchauth/knex-cloudflare-d1";

/**
 * @inheritDoc
 */
export class D1Connection extends BetterSqliteConnection {
  override async createKnex() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.client = this.createKnexClient(Client_D1 as any);
    this.connected = true;
  }

  override async connect() {
    this.createKnex();
  }
}
