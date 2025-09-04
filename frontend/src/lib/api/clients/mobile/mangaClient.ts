import { fetchApi } from "$lib/utils/fetch";

import type { MangaData } from "$lib/api/types/mobile/manga/genreType";
import type { MangaDetail } from "$lib/api/types/mobile/manga/detailType";
import type { All } from "$lib/api/types/mobile/manga/searchType";

export class MangaMobileClient {
  static async getbyGenre(genre: string, page: string = "1"): Promise<MangaData[]> {
    const response = await fetchApi("/manga/kiryuu/by-genre?genre=" + genre + "&page=" + page, "GET", {});
    return response.result.manga;
  }

  static async getDetail(slug: string): Promise<MangaDetail> {
    const response = await fetchApi("/manga/kiryuu/detail/" + slug, "GET", {});
    return response.result;
  }

  static async getChapterImage(slug: string): Promise<any> {
    const response = await fetchApi("/manga/kiryuu/chapters/" + slug, "GET", {});
    return response.result;
  }

  static async getSearch(query: string): Promise<All[]> {
    const response = await fetchApi("/manga/kiryuu/search?query=" + query, "GET", {});
    return response.result;
  }
}