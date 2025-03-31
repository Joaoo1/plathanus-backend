import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { DuplicatedNewsError } from '../../errors/DuplicatedNewsError';
import { NewsRepository } from '../../repositories/NewsRepository';
import { Slugify } from '../../utils/Slugify/Slugify';
import { CreateNewsUseCase } from './CreateNewsUseCase';

const makeSut = async () => {
  const slugify = new Slugify();
  const newsRepository = new NewsRepository();
  const sut = new CreateNewsUseCase(newsRepository, slugify);

  const user = await generateFakeUser();

  return { sut, newsRepository, user, slugify };
};

describe('CreateNewsUseCase', () => {
  it('should create a news article successfully', async () => {
    const { sut, user } = await makeSut();

    const newsData = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: user.id,
    };

    const result = await sut.execute(newsData);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('slug');
  });

  it('should throw DuplicatedNewsError if slug already exists', async () => {
    const { sut, newsRepository, user, slugify } = await makeSut();

    const title = faker.lorem.sentence();

    const newsData = {
      title,
      content: faker.lorem.paragraph(),
      authorId: user.id,
      slug: slugify.createSlug(title),
    };
    await newsRepository.create(newsData);

    const promise = sut.execute(newsData);

    await expect(promise).rejects.toBeInstanceOf(DuplicatedNewsError);
  });
});
