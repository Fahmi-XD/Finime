import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }): Promise<IMangaSlug> => {
  const slug = params.manga_slug;
  return {
    mangaSlug: slug
  }
}

export interface IMangaSlug {
  mangaSlug: string;
}