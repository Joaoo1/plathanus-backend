import type { Request, Response } from 'express';
import { NewsRepository } from '../../repositories/NewsRepository';
import { CreateNewsUseCase } from './CreateNewsUseCase';
import type { NewsRequest } from './CreateNewsValidator';

export class CreateNewsController {
  async handle(request: NewsRequest, response: Response) {
    const createNewsUseCase = new CreateNewsUseCase(new NewsRepository());

    const news = await createNewsUseCase.execute({
      title: request.body.title,
      content: request.body.content,
      authorId: request.user.id,
    });

    response.status(201).json(news);
  }
}
