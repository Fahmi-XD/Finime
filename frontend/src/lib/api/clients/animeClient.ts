import { fetchApi } from "$lib/utils/fetch";
import type { IRecentResponse } from "$lib/api/types/animeRecentType";
import type { ISearchStandarResponse } from "$lib/api/types/animeSearchType";
import type { ITopStandarResponse } from "$lib/api/types/animeTopType";
import type { IDetailStandarResponse } from "$lib/api/types/detailType";
import type { IConvertOtakudesuDetailModel } from "$lib/api/types/convertOtakudesuType";
import type { IConvertOtakudesuStreamModel } from "$lib/api/types/convertOtakudesuStream";

export class AnimeClient {
  static async getRecentAnimeList(page: string = "1"): Promise<IRecentResponse[]> {
    const response = await fetchApi("/anime/myanimelist/recent", "GET", { page });
    return response.result;
  }

  static async getSearchAnimeList(query: string): Promise<ISearchStandarResponse[]> {
    const response = await fetchApi(`/anime/myanimelist/search?query=${query}`, "GET", {});
    return response.result;
  }

  static async getTopAnimeList(page: string = "1"): Promise<ITopStandarResponse[]> {
    const response = await fetchApi(`/anime/myanimelist/top?page=${page}`, "GET", {});
    return response.result;
  }

  static async getSeasonNowAnimeList(page: string = "1"): Promise<ITopStandarResponse[]> {
    const response = await fetchApi(`/anime/myanimelist/season-now?page=${page}`, "GET", {});
    return response.result;
  }

  static async getDetailAnime(mal_id: string): Promise<IDetailStandarResponse> {
    const response = await fetchApi(`/anime/myanimelist/detail/${mal_id}`, "GET", {});
    return response.result;
  }

  static async getDetailOtakudesuAnime(title: string): Promise<IConvertOtakudesuDetailModel> {
    const response = await fetchApi(`/anime/otakudesu/find-title?title=${title}`, "GET", {});
    return response.result;
  }

  static async getDetailOtakudesuAnimeBySlug(slug: string): Promise<IConvertOtakudesuDetailModel> {
    const response = await fetchApi(`/anime/otakudesu/detail/${slug}`, "GET", {});
    return response.result[0] as IConvertOtakudesuDetailModel;
  }

  static async getStreamOtakudesuAnime(id: string, reso: string = "360p"): Promise<IConvertOtakudesuStreamModel[]> {
    console.log(id, reso);
    const response = await fetchApi(`/anime/otakudesu/stream/${id}?reso=${reso}`, "GET", {});
    return response.result;
  }
}