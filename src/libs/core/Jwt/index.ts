import jwt from 'jsonwebtoken';

import type { IJwt, JwtPayload } from './IJwt';

export class Jwt implements IJwt {
  constructor(private readonly secret: string) {}

  encrypt(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret as jwt.Secret, { expiresIn: '7d' });
  }
}
