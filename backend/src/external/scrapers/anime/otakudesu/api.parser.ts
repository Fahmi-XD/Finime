import { Scrape } from "@external/scrapers/scrape.js";
import { IotakudesuSearchModel } from "./search.model.js";
import { IotakudesuDetailModel } from "./detail.model.js";
import { IotakudesuStreamModel } from "./stream.model.js";

import { StringSimilarity } from "@lib/similarity.js";

export class OtakudesuApiParser extends Scrape {

  static baseUrl = "https://apps.animekita.org/api/v1.2.0";

  static async searchAnime(query: string) {
    return this.apiParser<any, IotakudesuSearchModel[]>({
      url: `${this.baseUrl}/search.php?keyword=${query}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data[0].result as IotakudesuSearchModel[];
      
      return datas;
    });
  }

  static async getDetailAnime(slug: string) {
    return this.apiParser<any, IotakudesuDetailModel[]>({
      url: `${this.baseUrl}/series.php?url=${slug}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as IotakudesuDetailModel[];
      
      return datas;
    });
  }

  static async getStreamAnime(id: string, reso: string) {
    return this.apiParser<any, IotakudesuStreamModel[]>({
      url: `${this.baseUrl}/chapter.php?url=${id}&reso=${reso}`,
      initial: []
    }, async (response, data) => {
      const datas = response.data as IotakudesuStreamModel[];
      
      return datas;
    });
  }

  static async findByTitle(title: string) {
    const search = await this.searchAnime(title);
    const similarity = StringSimilarity.sortMatch(title, search.map(item => item.judul || ""));

    if (similarity.length == 0) {
      return [];
    }

    const detail = await this.getDetailAnime(search[similarity[0].index].url || "");
    return detail[0];
  }

}
