import type { Insertable, Updateable } from 'kysely';
import type { NewsTable } from '../../../database/types';
import type { News } from '../entities/News';
import type { NewsWithAuthor } from '../entities/NewsWithAuthor';

export interface FindAllNewsParams {
  search: string | undefined;
}

export interface INewsRepository {
  create(newsData: Insertable<NewsTable>): Promise<News>;
  findBySlug(slug: string): Promise<News | null>;
  findById(id: string): Promise<News | null>;
  findAll(data: FindAllNewsParams): Promise<NewsWithAuthor[]>;
  update(id: string, data: Updateable<NewsTable>): Promise<News | null>;
  delete(id: string): Promise<boolean>;
}
