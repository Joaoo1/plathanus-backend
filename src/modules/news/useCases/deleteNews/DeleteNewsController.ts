import type { Request, Response } from 'express';
import { NewsRepository } from '../../repositories/NewsRepository';
import { DeleteNewsUseCase } from './DeleteNewsUseCase';

export class DeleteNewsController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const deleteNewsUseCase = new DeleteNewsUseCase(new NewsRepository());

    await deleteNewsUseCase.execute(id);

    response.status(204).send();
  }
}
