import { Router } from 'express';
import { authRouter } from '../modules/auth/router';
import { newsRouter } from '../modules/news/router';

const router = Router();

router.use('/api/auth', authRouter);

router.use('/api/news', newsRouter);

export { router };
