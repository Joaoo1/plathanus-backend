import { Router } from 'express';
import { EnsureAuthenticated } from '../../common/middlewares/EnsureAuthenticated';
import { CreateNewsController } from './useCases/createNews/CreateNewsController';
import { NewsValidator } from './useCases/createNews/CreateNewsValidator';
import { ListNewsController } from './useCases/listNews/ListNewsController';

const newsRouter = Router();

const createNewsController = new CreateNewsController();
const listNewsController = new ListNewsController();

newsRouter.get('/', listNewsController.handle);

newsRouter.use(EnsureAuthenticated);

newsRouter.post('/', NewsValidator, createNewsController.handle);

export { newsRouter };
