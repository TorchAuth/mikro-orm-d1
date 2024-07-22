"use strict";
import { beforeAll, describe, it } from "vitest";
import { D1Database } from "@cloudflare/workers-types";
import { MikroORM } from "src";
import { User } from "./test.entity";

// DEBUG=knex:*

const bindings = getMiniflareBindings();
const database = bindings.__D1_BETA__D1DATA as D1Database;

describe("better-sqlite3 unit tests", () => {
  beforeAll(async () => {
    MikroORM.init({
      debug: true,
      dbName: "d1",
      entities: [User],
      driverOptions: {
        connection: {
          database,
        },
      },
    });
  });

  it("knex works", async () => {});
});
