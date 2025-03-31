import type { Insertable, Updateable } from 'kysely';
import type { NewsTable } from '../../../database/types';
import type { News } from '../entities/News';

export interface INewsRepository {
  create(newsData: Insertable<NewsTable>): Promise<News>;
  findBySlug(slug: string): Promise<News | null>;
  findAll(): Promise<News[]>;
  update(id: string, data: Updateable<NewsTable>): Promise<News | null>;
}
