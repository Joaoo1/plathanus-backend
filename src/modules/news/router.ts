import { Router } from 'express';
import { CreateNewsController } from './useCases/createNews/CreateNewsController';
import { NewsValidator } from './useCases/createNews/CreateNewsValidator';

const newsRouter = Router();

const createNewsController = new CreateNewsController();

newsRouter.post('/', NewsValidator, createNewsController.handle);

export { newsRouter };
