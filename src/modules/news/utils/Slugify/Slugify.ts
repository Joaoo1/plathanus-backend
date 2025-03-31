import type { ISlugify } from './ISlugify';

const SlugMaxLength = 100;

export class Slugify implements ISlugify {
  createSlug(title: string): string {
    const titleWithoutAccents = title
      .normalize('NFD')
      .replace(/\u0300-\u036f/g, '')
      .toLowerCase()
      .trim();

    const titleWithoutSpecialChars = titleWithoutAccents.replace(
      /[^a-z0-9\s-]/g,
      ''
    );

    const titleWithoutSpaces = titleWithoutSpecialChars.replace(/\s+/g, '-');

    const titleWithoutMultipleDashes = titleWithoutSpaces.replace(/-+/g, '-');

    const slug = titleWithoutMultipleDashes.slice(0, SlugMaxLength);

    return slug;
  }
}
