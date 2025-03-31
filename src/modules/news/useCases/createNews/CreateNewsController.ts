import type { Request, Response } from 'express';
import { NewsRepository } from '../../repositories/NewsRepository';
import { Slugify } from '../../utils/Slugify/Slugify';
import { CreateNewsUseCase } from './CreateNewsUseCase';
import type { NewsRequest } from './CreateNewsValidator';

export class CreateNewsController {
  async handle(request: NewsRequest, response: Response) {
    const createNewsUseCase = new CreateNewsUseCase(
      new NewsRepository(),
      new Slugify()
    );

    const news = await createNewsUseCase.execute({
      title: request.body.title,
      content: request.body.content,
      authorId: request.user.id,
    });

    response.status(201).json(news);
  }
}
