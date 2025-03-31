import type { Insertable, Updateable } from 'kysely';
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

  async update(id: string, data: Updateable<NewsTable>): Promise<News | null> {
    const [updatedNews] = await db
      .updateTable('news')
      .set(data)
      .where('id', '=', id)
      .returningAll()
      .execute();

    if (!updatedNews) return null;

    return updatedNews;
  }

  async delete(id: string): Promise<boolean> {
    const [{ numDeletedRows }] = await db
      .deleteFrom('news')
      .where('id', '=', id)
      .execute();

    return Number(numDeletedRows) > 0;
  }
}
