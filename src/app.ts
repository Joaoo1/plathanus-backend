import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { generalRateLimiter } from './middlewares/RateLimiter';

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(generalRateLimiter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
