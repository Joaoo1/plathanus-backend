import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { ExceptionHandler } from './middlewares/ExceptionHandler';
import { generalRateLimiter } from './middlewares/RateLimiter';
import { router } from './router';

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(generalRateLimiter);

app.use(router);

app.use(ExceptionHandler);

export { app };
