import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }): IAnimeSlug => {
  return {
    animeId: params.anime_id
  }
}

export type IAnimeSlug = {
  animeId: string;
}