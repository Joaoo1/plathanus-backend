import type { Response } from 'express';
import { NewsRepository } from '../../repositories/NewsRepository';
import { Slugify } from '../../utils/Slugify/Slugify';
import { UpdateNewsUseCase } from './UpdateNewsUseCase';
import type { UpdateNewsRequest } from './UpdateNewsValidator';

export class UpdateNewsController {
  async handle(request: UpdateNewsRequest, response: Response): Promise<void> {
    const updateNewsUseCase = new UpdateNewsUseCase(
      new NewsRepository(),
      new Slugify()
    );

    const updatedNews = await updateNewsUseCase.execute({
      id: request.params.id,
      title: request.body.title,
      content: request.body.content,
    });

    response.status(200).json(updatedNews);
  }
}
