import {
  defineConfig,
  MikroORM,
  type Options,
  type IDatabaseDriver,
  type EntityManager,
  type EntityManagerType,
} from "@mikro-orm/core";
import { D1Driver } from "./D1Driver";
import type { SqlEntityManager } from "@mikro-orm/knex";

/**
 * @inheritDoc
 */
export class D1MikroORM<
  EM extends EntityManager = SqlEntityManager
> extends MikroORM<D1Driver, EM> {
  private static DRIVER = D1Driver;

  /**
   * @inheritDoc
   */
  static override async init<
    D extends IDatabaseDriver = D1Driver,
    EM extends EntityManager = D[typeof EntityManagerType] & EntityManager
  >(options?: Options<D, EM>): Promise<MikroORM<D, EM>> {
    return super.init(options);
  }

  /**
   * @inheritDoc
   */
  static override initSync<
    D extends IDatabaseDriver = D1Driver,
    EM extends EntityManager = D[typeof EntityManagerType] & EntityManager
  >(options: Options<D, EM>): MikroORM<D, EM> {
    return super.initSync(options);
  }
}

export type D1Options = Options<D1Driver>;

/* istanbul ignore next */
export function defineD1Config(options: D1Options) {
  return defineConfig({ driver: D1Driver, ...options });
}
