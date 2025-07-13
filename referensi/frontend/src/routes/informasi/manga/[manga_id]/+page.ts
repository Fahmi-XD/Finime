import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }): IMangaSlug => {
  return {
    mangaId: params.manga_id
  }
}

export type IMangaSlug = {
  mangaId: string;
}