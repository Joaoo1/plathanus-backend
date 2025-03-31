import type { CreateNewsDTO } from '../../dtos/CreateNewsDTO';
import type { News } from '../../entities/News';
import { DuplicatedNewsError } from '../../errors/DuplicatedNewsError';
import type { INewsRepository } from '../../repositories/INewsRepository';
import type { ISlugify } from '../../utils/Slugify/ISlugify';

export class CreateNewsUseCase {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly slugify: ISlugify
  ) {}

  async execute(data: CreateNewsDTO): Promise<News> {
    const slug = this.slugify.createSlug(data.title);

    const alreadyExists = await this.newsRepository.findBySlug(slug);

    if (alreadyExists) {
      throw new DuplicatedNewsError();
    }

    const news = await this.newsRepository.create({
      authorId: data.authorId,
      content: data.content,
      slug,
      title: data.title,
    });

    return news;
  }
}
