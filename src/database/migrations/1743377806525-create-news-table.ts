import { type Kysely, sql } from 'kysely';

import type { Database } from '../types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('news')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
    )
    .addColumn('title', 'varchar(255)', col => col.notNull())
    .addColumn('slug', 'varchar(255)', col => col.notNull().unique())
    .addColumn('content', 'text', col => col.notNull())
    .addColumn('authorId', 'uuid', col => col.notNull().references('users.id'))
    .addColumn('createdAt', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('news').execute();
}
