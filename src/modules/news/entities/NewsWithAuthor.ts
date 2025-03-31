import type { News } from './News';

export interface NewsWithAuthor extends News {
  authorName: string;
}
