import { AppError } from '../../../common/AppError';
import { HttpStatusCode } from '../../../common/HttpStatusCode';

export class DuplicatedNewsError extends AppError {
  constructor() {
    super('Notícia com este slug já existe', HttpStatusCode.CONFLICT);
  }
}
