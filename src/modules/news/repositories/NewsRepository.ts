import { type Insertable, type Updateable, sql } from 'kysely';
import { db } from '../../../database';
import type { NewsTable } from '../../../database/types';
import type { News } from '../entities/News';
import type { FindAllNewsParams, INewsRepository } from './INewsRepository';

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

  async findAll({ search }: FindAllNewsParams): Promise<News[]> {
    let query = db.selectFrom('news').selectAll();

    const mSearch = search?.trim();

    if (mSearch) {
      const searchTerm = `%${mSearch}%`;

      // biome-ignore lint/suspicious/noExplicitAny: <didn't find any documentation that helped me to find the correct type>
      const rawSql = sql<any>`unaccent(title) ILIKE unaccent(${searchTerm}) OR unaccent(content) ILIKE unaccent(${searchTerm})`;
      query = query.where(rawSql);

      query = query.orderBy(
        sql`CASE WHEN title ILIKE ${searchTerm} THEN 0 ELSE 1 END`,
        'asc'
      );
    } else {
      query = query.orderBy('createdAt', 'desc');
    }

    return query.execute();
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
