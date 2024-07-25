import { Entity, PrimaryKey, Property } from '../../out/mikro-orm-d1';

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
