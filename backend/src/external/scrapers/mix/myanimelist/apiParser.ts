import { Scrape } from "@external/scrapers/scrape.js";
import { ICharacterStandarResponse } from "@models/anime/characterResponseModel.js";
import { IDetailStandarResponse } from "@models/anime/detailResponseModel.js";
import { IStatisticsStandarResponse } from "@models/anime/statisticsResponseModel.js";
import type { IRecentStandarResponse } from "@models/anime/recentResponseModel.js";
import type { ISearchStandarResponse } from "@models/anime/searchResponseModel.js";
import type { ITopStandarResponse } from "@models/anime/topResponseModel.js";
import { IStaffStandarResponse } from "@models/anime/staffResponseModel.js";
import { IEpisodesStandarResponse } from "@models/anime/episodesResponseModel.js";

export class MyAnimeListApiParser extends Scrape {

  static baseUrl = "https://api.jikan.moe/v4";

  static async getRecentAnimeList(page: string = "1") {
    return this.apiParser<any, IRecentStandarResponse[]>({
      url: `${this.baseUrl}/recommendations/anime?page=${page}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as IRecentStandarResponse[];
      
      return datas;
    });
  }

  static async getSearchAnimeList(query: string) {
    return this.apiParser<any, ISearchStandarResponse[]>({
      url: `${this.baseUrl}/anime?q=${query}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as ISearchStandarResponse[];
      
      return datas;
    });
  }

  static async getTopAnimeList(page: string = "1") {
    return this.apiParser<any, ITopStandarResponse[]>({
      url: `${this.baseUrl}/top/anime?page=${page}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as ITopStandarResponse[];
      
      return datas;
    });
  }

  static async getSeasonNowAnimeList(page: string = "1") {
    return this.apiParser<any, ITopStandarResponse[]>({
      url: `${this.baseUrl}/seasons/now?page=${page}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as ITopStandarResponse[];
      
      return datas;
    });
  }

  static async getDetailAnime(mal_id: string) {
    return this.apiParser<any, IDetailStandarResponse>({
      url: `${this.baseUrl}/anime/${mal_id}/full`,
      initial: {}
    }, async (response, data) => {
      const datas = response.data as IDetailStandarResponse;
      
      return datas;
    });
  }

  static async getDetailAnimeCharacters(mal_id: string) {
    return this.apiParser<any, ICharacterStandarResponse[]>({
      url: `${this.baseUrl}/anime/${mal_id}/characters`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as ICharacterStandarResponse[];
      
      return datas;
    });
  }

  static async getDetailAnimeStatistics(mal_id: string) {
    return this.apiParser<any, IStatisticsStandarResponse>({
      url: `${this.baseUrl}/anime/${mal_id}/statistics`,
      initial: {}
    }, async (response, data) => {
      const datas = response.data as IStatisticsStandarResponse;
      
      return datas;
    });
  }

  static async getDetailAnimeStaff(mal_id: string) {

    return this.apiParser<any, IStaffStandarResponse[]>({
      url: `${this.baseUrl}/anime/${mal_id}/staff`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as IStaffStandarResponse[];
      
      return datas;
    });
  }

  static async getDetailAnimeEpisodes(mal_id: string) {

    return this.apiParser<any, IEpisodesStandarResponse[]>({
      url: `${this.baseUrl}/anime/${mal_id}/episodes`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as IEpisodesStandarResponse[];
      
      return datas;
    });
  }

  static async getDetailAnimeFull(mal_id: string) {

    return this.apiParser<any, IDetailStandarResponse>({
      url: `${this.baseUrl}/anime/${mal_id}/full`,
      initial: {}
    }, async (response, data) => {
      const asyncList = [
        MyAnimeListApiParser.getDetailAnimeCharacters(mal_id),
        MyAnimeListApiParser.getDetailAnimeStatistics(mal_id),
        MyAnimeListApiParser.getDetailAnimeStaff(mal_id),
        MyAnimeListApiParser.getDetailAnimeEpisodes(mal_id)
      ];

      const [characters, statistics, staff, episodes] = await Promise.all(asyncList);

      data = response.data as IDetailStandarResponse;
      data.characters = characters as ICharacterStandarResponse[];
      data.statistics = statistics as IStatisticsStandarResponse;
      data.staff = staff as IStaffStandarResponse[];
      data.episodes_list = episodes as IEpisodesStandarResponse[];

      if (data.episodes_list) {
        data.episodes_list = data.episodes_list.sort((a, b) => b?.mal_id as number - (a?.mal_id as number));
      }

      return data;
    });
  }

}
