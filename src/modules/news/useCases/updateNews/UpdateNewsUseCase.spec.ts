import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { DuplicatedNewsError } from '../../errors/DuplicatedNewsError';
import { NotFoundNewsError } from '../../errors/NotFoundNewsError';
import { NewsRepository } from '../../repositories/NewsRepository';
import { Slugify } from '../../utils/Slugify/Slugify';
import { UpdateNewsUseCase } from './UpdateNewsUseCase';

const makeSut = async () => {
  const slugify = new Slugify();
  const newsRepository = new NewsRepository();
  const sut = new UpdateNewsUseCase(newsRepository, slugify);

  const user = await generateFakeUser();

  return { sut, newsRepository, slugify, user };
};

describe('UpdateNewsUseCase', () => {
  it('should update a news article successfully', async () => {
    const { sut, newsRepository, slugify, user } = await makeSut();

    const title = faker.lorem.sentence();
    const existingNews = await newsRepository.create({
      title,
      content: 'Old Content',
      slug: slugify.createSlug(title),
      authorId: user.id,
    });

    const updatedTitle = faker.lorem.sentence();
    const updatedData = {
      id: existingNews.id,
      title: updatedTitle,
      content: 'Updated Content',
    };

    await sut.execute(updatedData);

    const result = await newsRepository.findById(existingNews.id);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', existingNews.id);
    expect(result?.title).toBe(updatedData.title);
    expect(result?.content).toBe(updatedData.content);
  });

  it('should throw NotFoundNewsError if the news does not exist', async () => {
    const { sut } = await makeSut();

    const promise = sut.execute({
      id: faker.string.uuid(),
      title: 'Non-existent Title',
      content: 'Non-existent Content',
    });

    await expect(promise).rejects.toBeInstanceOf(NotFoundNewsError);
  });

  it('should throw DuplicatedNewsError if the slug already exists', async () => {
    const { sut, newsRepository, slugify, user } = await makeSut();

    const existingTitle = faker.lorem.sentence();
    const existingNews = await newsRepository.create({
      title: existingTitle,
      content: 'Existing Content',
      slug: slugify.createSlug(existingTitle),
      authorId: user.id,
    });

    const anotherTitle = faker.lorem.sentence();
    const anotherNews = await newsRepository.create({
      title: anotherTitle,
      content: 'Another Content',
      slug: slugify.createSlug(anotherTitle),
      authorId: user.id,
    });

    const promise = sut.execute({
      id: anotherNews.id,
      title: existingNews.title,
      content: 'Updated Content',
    });

    await expect(promise).rejects.toBeInstanceOf(DuplicatedNewsError);
  });
});
