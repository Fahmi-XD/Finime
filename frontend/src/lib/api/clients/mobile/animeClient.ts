import { fetchApi } from "$lib/utils/fetch";
import type { ISummerModel } from "$lib/api/types/mobile/summerType";
import type { IHomeModel } from "$lib/api/types/mobile/homeType";
import type { Datum } from "$lib/api/types/mobile/searchType";
import type { IAnimeDetail } from "$lib/api/types/mobile/detailType";
import type { IAnimeEpisodeDetail } from "$lib/api/types/mobile/episodeType";

export class AnimeMobileClient {
  static async getSummer(page: string = "1"): Promise<ISummerModel> {
    const response = await fetchApi("/anime/kuramanime/summer", "GET", { page });
    return response.result;
  }

  static async getHome(): Promise<IHomeModel> {
    const response = await fetchApi("/anime/kuramanime/home", "GET", {});
    return response.result;
  }

  static async getSearch(query: string): Promise<Datum[]> {
    const response = await fetchApi("/anime/kuramanime/search?query=" + encodeURIComponent(query), "GET", {});
    return response.result;
  }

  static async getDetail(fullSlug: string): Promise<IAnimeDetail> {
    const response = await fetchApi("/anime/kuramanime/detail/" + fullSlug, "GET", {});
    return response.result;
  }

  static async getEpisode(fullSlug: string): Promise<IAnimeEpisodeDetail> {
    const response = await fetchApi("/anime/kuramanime/episode/" + fullSlug + "/kuramadrive", "GET", {});
    return response.result;
  }
}