import type { News } from '../../entities/News';
import type { INewsRepository } from '../../repositories/INewsRepository';

export class ListNewsUseCase {
  constructor(private readonly newsRepository: INewsRepository) {}

  async execute(): Promise<News[]> {
    return await this.newsRepository.findAll();
  }
}
