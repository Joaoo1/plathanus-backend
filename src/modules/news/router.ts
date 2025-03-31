import { Router } from 'express';
import { EnsureAuthenticated } from '../../common/middlewares/EnsureAuthenticated';
import { CreateNewsController } from './useCases/createNews/CreateNewsController';
import { NewsValidator } from './useCases/createNews/CreateNewsValidator';
import { DeleteNewsController } from './useCases/deleteNews/DeleteNewsController';
import { DeleteNewsValidator } from './useCases/deleteNews/DeleteNewsValidator';
import { ListNewsController } from './useCases/listNews/ListNewsController';
import { UpdateNewsController } from './useCases/updateNews/UpdateNewsController';
import { UpdateNewsValidator } from './useCases/updateNews/UpdateNewsValidator';

const newsRouter = Router();

const createNewsController = new CreateNewsController();
const listNewsController = new ListNewsController();
const updateNewsController = new UpdateNewsController();
const deleteNewsController = new DeleteNewsController();

newsRouter.get('/', listNewsController.handle);

newsRouter.use(EnsureAuthenticated);

newsRouter.post('/', NewsValidator, createNewsController.handle);
newsRouter.put('/:id', UpdateNewsValidator, updateNewsController.handle);
newsRouter.delete('/:id', DeleteNewsValidator, deleteNewsController.handle);

export { newsRouter };
