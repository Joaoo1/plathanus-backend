import { AppError } from '../../../../common/AppError';
import type { UpdateNewsDTO } from '../../dtos/UpdateNewsDTO';
import type { News } from '../../entities/News';
import { DuplicatedNewsError } from '../../errors/DuplicatedNewsError';
import type { INewsRepository } from '../../repositories/INewsRepository';

export class UpdateNewsUseCase {
  private readonly SlugLength = 100;

  constructor(private readonly newsRepository: INewsRepository) {}

  async execute({ id, title, content }: UpdateNewsDTO): Promise<News> {
    const slug = this.generateSlug(title);

    const existingNews = await this.newsRepository.findBySlug(slug);

    if (existingNews && existingNews.id !== id) {
      throw new DuplicatedNewsError();
    }

    const news = await this.newsRepository.update(id, { title, content, slug });

    if (!news) {
      throw new AppError('Notícia não encontrada', 404);
    }

    return news;
  }

  private generateSlug(title: string): string {
    const titleWithoutAccents = title
      .normalize('NFD')
      .replace(/\u0300-\u036f/g, '')
      .toLowerCase()
      .trim();

    const titleWithoutSpecialChars = titleWithoutAccents.replace(
      /[^a-z0-9\s-]/g,
      ''
    );

    const titleWithoutSpaces = titleWithoutSpecialChars.replace(/\s+/g, '-');

    const titleWithoutMultipleDashes = titleWithoutSpaces.replace(/-+/g, '-');

    const slug = titleWithoutMultipleDashes.slice(0, this.SlugLength);

    return slug;
  }
}
