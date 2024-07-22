import { AbstractSqlDriver } from '@mikro-orm/knex';
import type { Configuration } from '@mikro-orm/core';
import { D1Connection } from './D1Connection';
import { D1Platform } from './D1Platform';

/**
 * @inheritDoc
 */
export class D1Driver extends AbstractSqlDriver<D1Connection> {
  constructor(config: Configuration) {
    super(config, new D1Platform(), D1Connection, ['knex']);
  }
}
