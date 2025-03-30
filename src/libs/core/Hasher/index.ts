import bcrypt from 'bcrypt';

import type { IHasher } from './IHasher';

export class Bcrypt implements IHasher {
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest);
  }
}
