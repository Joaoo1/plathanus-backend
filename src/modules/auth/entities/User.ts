import type { BaseEntity } from '../../../common/BaseEntity';

export interface User extends BaseEntity {
  name: string;
  email: string;
  passwordHash: string;
}
