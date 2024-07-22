import { AbstractSqlDriver } from "@mikro-orm/knex";
import { BetterSqlitePlatform } from "@mikro-orm/better-sqlite";
import type { Configuration } from "@mikro-orm/core";
import { D1Connection } from "./D1Connection";

export class D1Driver extends AbstractSqlDriver<D1Connection> {
  constructor(config: Configuration) {
    super(config, new BetterSqlitePlatform(), D1Connection, ["knex"]);
  }
}
