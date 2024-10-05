import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id!: number;

  @Property({ type: 'string' })
  fullName!: string;

  @Property({ type: 'string' })
  email!: string;

  @Property({ type: 'string' })
  password!: string;

  @Property({ type: 'string' })
  bio!: string;
}
