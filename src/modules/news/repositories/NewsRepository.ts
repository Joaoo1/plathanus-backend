import type { Insertable } from 'kysely';
import { db } from '../../../database';
import type { NewsTable } from '../../../database/types';
import type { News } from '../entities/News';
import type { INewsRepository } from './INewsRepository';

export class NewsRepository implements INewsRepository {
  async create(newsData: Insertable<NewsTable>): Promise<News> {
    const [createdNews] = await db
      .insertInto('news')
      .values(newsData)
      .returningAll()
      .execute();

    return createdNews;
  }

  async findBySlug(slug: string): Promise<News | null> {
    const news = await db
      .selectFrom('news')
      .where('slug', '=', slug)
      .selectAll()
      .limit(1)
      .executeTakeFirst();

    if (!news) return null;

    return news;
  }

  async findAll(): Promise<News[]> {
    return db.selectFrom('news').selectAll().execute();
  }
}
