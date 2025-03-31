import type { BaseEntity } from '../../../common/BaseEntity';

export interface News extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  authorId: string;
}
