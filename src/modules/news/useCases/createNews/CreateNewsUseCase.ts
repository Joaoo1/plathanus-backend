import type { CreateNewsDTO } from '../../dto/CreateNewsDTO';
import type { News } from '../../entities/News';
import { DuplicatedNewsError } from '../../errors/DuplicatedNewsError';
import type { INewsRepository } from '../../repositories/INewsRepository';

export class CreateNewsUseCase {
  private readonly SlugLength = 100;

  constructor(private readonly newsRepository: INewsRepository) {}

  async execute(data: CreateNewsDTO): Promise<News> {
    const slug = this.generateSlug(data.title);

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
