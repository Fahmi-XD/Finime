import type { PageLoad } from "./$types";

export const ssr = false;
export const csr = true;

export const load: PageLoad = ({ params }): IAnimeSlug => {
  return {
    animeSlug: params.anime_slug
  }
}

export interface IAnimeSlug {
  animeSlug: string;
}