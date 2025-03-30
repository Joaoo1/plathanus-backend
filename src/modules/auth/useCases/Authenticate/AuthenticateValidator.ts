import validate from 'express-zod-safe';
import { z } from '../../../../libs/core/PtZod';

const body = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const AuthenticateValidator = validate({ body });

export type AuthenticateRequest = Parameters<typeof AuthenticateValidator>[0];
