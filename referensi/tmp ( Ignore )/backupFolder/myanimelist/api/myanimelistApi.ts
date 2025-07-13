import Scrape from "@scrapers/scrape.js";
import type { ISearch, ISearchAnimeResponse } from "../models/animelistModel.js";
import type { ICharactersAndActorsResponse } from "../models/charvoiceModel.js";
import { IAnimeFUllResponse } from "../models/animeFullModel.js";

export class MyanimeListParser extends Scrape {

  private static baseUrl = "https://api.jikan.moe/v4/";

  static async getVoiceandChars(animeId: string) {
    const url = this.baseUrl + `anime/${animeId}/characters`;

    return this.apiParser<ICharactersAndActorsResponse, ICharactersAndActorsResponse>(
      {
        url,
        initial: { data: [] }
      },

      async (response, data) => {
        return response;
      }
    )
  }

  static async getFullAnime(animeId: string) {
    const url = this.baseUrl + `anime/${animeId}/full`;

    return this.apiParser<IAnimeFUllResponse, IAnimeFUllResponse>(
      {
        url,
        initial: { data: {} }
      },

      async (response, data) => {
        return response;
      }
    )
  }

  static async searchAnime(q: string) {
    const url = this.baseUrl + `anime?q=${q}`;

    return this.apiParser<ISearchAnimeResponse, ISearch>(
      {
        url,
        initial: { animeList: [] }
      },

      async (response, data) => {
        for (const item of response.data) {
          const title: string = item.title;
          const status: string = item.status;
          const score: string = (item.score)?.toString() || "N/A";
          const poster: string = item.images.jpg.large_image_url || "";
          const animeId: string = item.mal_id.toString();
          const href: string = item.url || "";
          const jikanUrl: string = item.url || "";
          const genreList = item.genres.map(genre => ({
            title: genre.name,
            genreId: genre.mal_id.toString(),
            href: genre.url || "",
            jikanUrl: genre.url || "",
          }));

          data.animeList.push({
            title,
            status,
            score,
            poster,
            animeId,
            href,
            jikanUrl,
            genreList
          });
        }

        return data;
      }
    )
  }

}