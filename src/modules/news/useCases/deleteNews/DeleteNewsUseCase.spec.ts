import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { NotFoundNewsError } from '../../errors/NotFoundNewsError';
import { NewsRepository } from '../../repositories/NewsRepository';
import { DeleteNewsUseCase } from './DeleteNewsUseCase';

const makeSut = async () => {
  const newsRepository = new NewsRepository();
  const sut = new DeleteNewsUseCase(newsRepository);

  const user = await generateFakeUser();

  return { sut, newsRepository, user };
};

describe('DeleteNewsUseCase', () => {
  it('should delete a news article successfully', async () => {
    const { sut, newsRepository, user } = await makeSut();

    const news = await newsRepository.create({
      title: faker.lorem.sentence(),
      content: 'Content to Delete',
      slug: faker.lorem.slug(),
      authorId: user.id,
    });

    await sut.execute(news.id);

    const deletedNews = await newsRepository.findById(news.id);
    expect(deletedNews).toBeNull();
  });

  it('should throw NotFoundNewsError if the news does not exist', async () => {
    const { sut } = await makeSut();

    const promise = sut.execute(faker.string.uuid());

    await expect(promise).rejects.toBeInstanceOf(NotFoundNewsError);
  });
});
