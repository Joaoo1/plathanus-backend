import { NotFoundNewsError } from '../../errors/NotFoundNewsError';
import type { INewsRepository } from '../../repositories/INewsRepository';

export class DeleteNewsUseCase {
  constructor(private readonly newsRepository: INewsRepository) {}

  async execute(id: string): Promise<void> {
    const isDeleted = await this.newsRepository.delete(id);

    if (!isDeleted) {
      throw new NotFoundNewsError();
    }
  }
}
