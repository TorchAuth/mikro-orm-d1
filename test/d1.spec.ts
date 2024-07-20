"use strict";
import { MikroORM } from "src";
import { describe, it, expect, beforeAll } from "vitest";

// DEBUG=knex:*

const bindings = getMiniflareBindings();

describe("better-sqlite3 unit tests", () => {
  beforeAll(async () => {
    MikroORM.init({});
  });

  it("knex works", async () => {});
});
