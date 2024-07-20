"use strict";
import { MikroORM } from "src";
import { describe, it, expect, beforeAll } from "vitest";

// DEBUG=knex:*

const bindings = getMiniflareBindings();

describe("better-sqlite3 unit tests", () => {
  beforeAll(async () => {
    MikroORM.init({
      dbName: "local.db",
      entities: ["./test/*.entity.*"],
      driverOptions: {
        connection: {
          database: bindings.__D1_BETA__D1DATA,
        },
      },
    });
  });

  it("knex works", async () => {});
});
