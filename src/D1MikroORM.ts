import { type EntityManager, type EntityManagerType, type IDatabaseDriver, MikroORM, type Options, defineConfig } from '@mikro-orm/core';
import { D1Database } from '@cloudflare/workers-types';
import { D1Driver } from './D1Driver';
import type { SqlEntityManager } from '@mikro-orm/knex';

type D1DriverOptions = {
  driverOptions: { connection: { database: D1Database } };
};

type D1DatabaseConfigOptions<
  D extends IDatabaseDriver = D1Driver,
  EM extends EntityManager = D[typeof EntityManagerType] & EntityManager
> = Omit<Options<D, EM>, 'driverOptions'> & D1DriverOptions;

/**
 * @inheritDoc
 */
export class D1MikroORM<EM extends EntityManager = SqlEntityManager> extends MikroORM<D1Driver, EM> {
  private static DRIVER = D1Driver;

  /**
   * @inheritDoc
   */
  static override async init<D extends IDatabaseDriver = D1Driver, EM extends EntityManager = D[typeof EntityManagerType] & EntityManager>(
    options?: D1DatabaseConfigOptions<D, EM>
  ): Promise<MikroORM<D, EM>> {
    if (options) options.ensureDatabase = false;

    return super.init(options);
  }

  /**
   * @inheritDoc
   */
  static override initSync<D extends IDatabaseDriver = D1Driver, EM extends EntityManager = D[typeof EntityManagerType] & EntityManager>(
    options: D1DatabaseConfigOptions<D, EM>
  ): MikroORM<D, EM> {
    options.ensureDatabase = false;
    return super.initSync(options);
  }
}

export type D1Options = Omit<Options<D1Driver>, 'driverOptions'> & D1DriverOptions;

/* istanbul ignore next */
export function defineD1Config(options: D1Options) {
  return defineConfig({ driver: D1Driver, ...options });
}
