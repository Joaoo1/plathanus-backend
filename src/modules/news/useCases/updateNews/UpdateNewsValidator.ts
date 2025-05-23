import validate from 'express-zod-safe';
import { z } from '../../../../common/libs/PtZod';

const params = z.object({
  id: z.string().uuid(),
});

const body = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

export const UpdateNewsValidator = validate({ body, params });

export type UpdateNewsRequest = Parameters<typeof UpdateNewsValidator>[0];
