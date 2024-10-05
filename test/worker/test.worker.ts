import { D1MikroORM } from "../../src";
import { User } from "./test.entity";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    console.log("test");
    const mikro = await D1MikroORM.init({
      debug: true,
      dbName: "d1",
      entities: [User],
      driverOptions: {
        connection: {
          database: env.MY_DB,
        },
      },
    });
    return new Response("Hello World!");
  },
} satisfies ExportedHandler<Env>;

interface Env {
  MY_DB: D1Database;
}
