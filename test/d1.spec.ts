"use strict";
import { MikroORM } from "src";
import { describe, it, expect, beforeAll } from "vitest";
import { User } from "./test.entity";
import { D1Database } from "@cloudflare/workers-types";

// DEBUG=knex:*

const bindings = getMiniflareBindings();
const database = bindings.__D1_BETA__D1DATA as D1Database;

describe("better-sqlite3 unit tests", () => {
  beforeAll(async () => {
    MikroORM.init({
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
