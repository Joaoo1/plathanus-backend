import type { Request, Response } from 'express';
import type { ListNewsDTO } from '../../dtos/ListNewsDTO';
import { NewsRepository } from '../../repositories/NewsRepository';
import { ListNewsUseCase } from './ListNewsUseCase';

export class ListNewsController {
  async handle(request: Request, response: Response): Promise<void> {
    const listNewsUseCase = new ListNewsUseCase(new NewsRepository());

    const news = await listNewsUseCase.execute({
      search: request.query.search as string,
    });

    response.status(200).json(news);
  }
}
