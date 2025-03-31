import { Router } from 'express';
import { EnsureAuthenticated } from '../../common/middlewares/EnsureAuthenticated';
import { CreateNewsController } from './useCases/createNews/CreateNewsController';
import { NewsValidator } from './useCases/createNews/CreateNewsValidator';
import { ListNewsController } from './useCases/listNews/ListNewsController';
import { UpdateNewsController } from './useCases/updateNews/UpdateNewsController';
import { UpdateNewsValidator } from './useCases/updateNews/UpdateNewsValidator';

const newsRouter = Router();

const createNewsController = new CreateNewsController();
const listNewsController = new ListNewsController();
const updateNewsController = new UpdateNewsController();

newsRouter.get('/', listNewsController.handle);

newsRouter.use(EnsureAuthenticated);

newsRouter.post('/', NewsValidator, createNewsController.handle);
newsRouter.put('/:id', UpdateNewsValidator, updateNewsController.handle);

export { newsRouter };
