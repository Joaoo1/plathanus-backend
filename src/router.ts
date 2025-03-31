import { Router } from 'express';
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated';
import { authRouter } from './modules/auth/router';
import { newsRouter } from './modules/news/router';

const router = Router();

router.use('/api/auth', authRouter);

router.use(EnsureAuthenticated);

router.use('/api/news', newsRouter);

export { router };
