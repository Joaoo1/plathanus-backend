import { AppError } from '../../../common/AppError';
import { HttpStatusCode } from '../../../common/HttpStatusCode';

export class NotFoundNewsError extends AppError {
  constructor() {
    super('Notícia não encontrada', HttpStatusCode.NOT_FOUND);
  }
}
