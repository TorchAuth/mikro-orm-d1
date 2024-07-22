import type { Configuration } from "@mikro-orm/core";
import { AbstractSqlDriver } from "@mikro-orm/knex";
import { D1Connection } from "./D1Connection";
import { BetterSqlitePlatform } from "@mikro-orm/better-sqlite";

export class D1Driver extends AbstractSqlDriver<D1Connection> {
  constructor(config: Configuration) {
    super(config, new BetterSqlitePlatform(), D1Connection, ["knex"]);
  }
}
