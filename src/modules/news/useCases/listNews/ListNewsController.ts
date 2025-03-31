import type { Request, Response } from 'express';
import { NewsRepository } from '../../repositories/NewsRepository';
import { ListNewsUseCase } from './ListNewsUseCase';

export class ListNewsController {
  async handle(_: Request, response: Response): Promise<void> {
    const listNewsUseCase = new ListNewsUseCase(new NewsRepository());

    const news = await listNewsUseCase.execute();

    response.status(200).json(news);
  }
}
