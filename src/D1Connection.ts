import { BaseSqliteConnection } from "@mikro-orm/knex";
import Client_D1 from "@torchauth/knex-cloudflare-d1";

export class D1Connection extends BaseSqliteConnection {
  override async createKnex() {
    this.client = this.createKnexClient(Client_D1 as any);
  }

  override async connect() {
    this.createKnex();
    this.connected = true;
  }
}
