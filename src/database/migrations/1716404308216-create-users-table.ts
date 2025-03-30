import { type Kysely, sql } from 'kysely';

import type { Database } from '../types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', col => col.primaryKey())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('email', 'varchar(255)', col => col.notNull())
    .addColumn('passwordHash', 'varchar(255)', col => col.notNull())
    .addColumn('createdAt', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('users').execute();
}
