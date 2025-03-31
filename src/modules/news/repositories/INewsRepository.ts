import type { Insertable } from 'kysely';
import type { NewsTable } from '../../../database/types';
import type { News } from '../entities/News';

export interface INewsRepository {
  create(email: Insertable<NewsTable>): Promise<News>;
  findBySlug(slug: string): Promise<News | null>;
}
