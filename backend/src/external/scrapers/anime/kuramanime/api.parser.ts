import { Scrape } from "@external/scrapers/scrape.js";
import { ISearchModel } from "./search.model";

export class KuramanimeParser extends Scrape {

  static baseUrl = "https://v8.kuramanime.run";

  static async searchAnime(query: string) {
    return this.htmlParser<ISearchModel[]>({
      url: `${this.baseUrl}/anime?search=${query}&order_by=oldest`,
      initial: [],
      cf: true
    }, async ($, data) => {
      console.log($("#animeList .filter__gallery a").length)
      $('#animeList .filter__gallery a').each((index, element) => {
        const rating = $(element).find('.ep .actual-anime-3526, .ep .actual-anime-3802').text().trim();
        const resolution = $(element).find('.view').text().trim();
        const coverImage = $(element).find('.product__sidebar__view__item').data('setbg') as string;
        const title = $(element).find('.sidebar-title-h5').text().trim();

        data.push({
          rating,
          resolution,
          cover: coverImage || "",
          title,
        });

        console.log(data)
      });

      return data;
    });
  }

}
