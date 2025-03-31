import type { UpdateNewsDTO } from '../../dtos/UpdateNewsDTO';
import type { News } from '../../entities/News';
import { DuplicatedNewsError } from '../../errors/DuplicatedNewsError';
import { NotFoundNewsError } from '../../errors/NotFoundNewsError';
import type { INewsRepository } from '../../repositories/INewsRepository';
import type { ISlugify } from '../../utils/Slugify/ISlugify';

export class UpdateNewsUseCase {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly slugify: ISlugify
  ) {}

  async execute({ id, title, content }: UpdateNewsDTO): Promise<News> {
    const slug = this.slugify.createSlug(title);

    const existingNews = await this.newsRepository.findBySlug(slug);

    if (existingNews && existingNews.id !== id) {
      throw new DuplicatedNewsError();
    }

    const news = await this.newsRepository.update(id, { title, content, slug });

    if (!news) {
      throw new NotFoundNewsError();
    }

    return news;
  }
}
