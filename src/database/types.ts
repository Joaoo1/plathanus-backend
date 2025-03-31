import type { ColumnType } from 'kysely';

export interface Database {
  users: UsersTable;
  news: NewsTable;
}

interface BaseTable {
  id: ColumnType<string, never, never>;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export interface UsersTable extends BaseTable {
  name: string;
  email: string;
  passwordHash: string;
}

export interface NewsTable extends BaseTable {
  title: string;
  content: string;
  authorId: string;
  slug: ColumnType<string, string, string>;
}
