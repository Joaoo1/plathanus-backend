import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { db } from '../../../../database';
import { NewsRepository } from '../../repositories/NewsRepository';
import { ListNewsUseCase } from './ListNewsUseCase';

const makeSut = async () => {
  const newsRepository = new NewsRepository();
  const sut = new ListNewsUseCase(newsRepository);

  const user = await generateFakeUser();

  return { sut, newsRepository, user };
};

describe('ListNewsUseCase', () => {
  beforeEach(async () => {
    await db.deleteFrom('news').execute();
  });

  it('should list all news articles', async () => {
    const { sut, newsRepository, user } = await makeSut();

    const mockNews = Array.from({ length: 3 }).map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      slug: faker.lorem.slug(),
      authorId: user.id,
    }));

    await Promise.all(mockNews.map(newsRepository.create));

    const result = await sut.execute({ search: '' });

    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result[0]).toHaveProperty('id');
  });

  it('should filter news that the search query in the title', async () => {
    const { sut, newsRepository, user } = await makeSut();

    const mockNews = [
      {
        title: 'Breaking News',
        content: 'Some content here',
        slug: faker.lorem.slug(),
        authorId: user.id,
      },
      {
        title: 'Other News',
        content: 'Some content here',
        slug: faker.lorem.slug(),
        authorId: user.id,
      },
    ];

    const createdNews = await Promise.all([
      newsRepository.create(mockNews[0]),
      newsRepository.create(mockNews[1]),
    ]);

    const result = await sut.execute({ search: 'breaking' });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(createdNews[0].id);
  });

  it('should filter news that the search query in the content', async () => {
    const { sut, newsRepository, user } = await makeSut();

    const news = [
      {
        title: 'News with content',
        content: 'Breaking news content here',
        slug: faker.lorem.slug(),
        authorId: user.id,
      },
      {
        title: 'Other News',
        content: 'Some content here',
        slug: faker.lorem.slug(),
        authorId: user.id,
      },
    ];

    const createdNews = await Promise.all([
      newsRepository.create(news[0]),
      newsRepository.create(news[1]),
    ]);

    const result = await sut.execute({ search: 'breaking' });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(createdNews[0].id);
  });

  it('should ignore accents when filtering news', async () => {
    const { sut, newsRepository, user } = await makeSut();

    const news = await newsRepository.create({
      title: 'Coração',
      content: 'Breaking news content here',
      slug: faker.lorem.slug(),
      authorId: user.id,
    });

    const result = await sut.execute({ search: 'coracao' });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(news.id);
  });
});
