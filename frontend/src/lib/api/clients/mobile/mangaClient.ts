import { fetchApi } from "$lib/utils/fetch";

import type { MangaData } from "$lib/api/types/mobile/manga/genreType";
import type { MangaDetail } from "$lib/api/types/mobile/manga/detailType";

export class MangaMobileClient {
  static async getbyGenre(genre: string, page: string = "1"): Promise<MangaData[]> {
    const response = await fetchApi("/manga/kiryuu/by-genre?genre=" + genre + "&page=" + page, "GET", {});
    return response.result.manga;
  }

  static async getDetail(slug: string): Promise<MangaDetail> {
    const response = await fetchApi("/manga/kiryuu/detail/" + slug, "GET", {});
    return response.result;
  }

  static async getChapterImage(slug: string): Promise<string[]> {
    const response = await fetchApi("/manga/kiryuu/chapters/" + slug, "GET", {});
    return response.result;
  }
}