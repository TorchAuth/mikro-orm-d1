import { defineConfig } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './test.entity';

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
	dbName: 'd1',
	// folder-based discovery setup, using common filename suffix
	entities: [User],
	// entitiesTs: ['src/**/*.entity.ts'],
	// we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
	// check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
	metadataProvider: TsMorphMetadataProvider,
	// enable debug mode to log SQL queries and discovery information
	debug: true,
});
