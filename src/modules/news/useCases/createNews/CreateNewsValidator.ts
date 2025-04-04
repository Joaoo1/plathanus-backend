import validate from 'express-zod-safe';
import { z } from '../../../../common/libs/PtZod';

const body = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

export const NewsValidator = validate({ body });

export type NewsRequest = Parameters<typeof NewsValidator>[0];
