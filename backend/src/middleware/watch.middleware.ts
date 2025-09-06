/**
 * Middleware Penambah Total Nonton Manga, Anime dan Otomatis menambah ke history ketika ada anime yang baru saja ditonton
 */

import prismaClient from "@databases/prisma.client.js"
import { customCache } from "@lib/cache.js"
import UserService from "@services/user.service.js";
import { KuramanimeParser } from "@external/scrapers/anime/kuramanime/api.parser.js";
import type { IAnimeDetail } from "@external/scrapers/anime/kuramanime/detail.model.js";
import { MangaDetail } from "@external/scrapers/manga/kiryuu/detail.model.js";
import { KiryuuParser } from "@external/scrapers/manga/kiryuu/parser.js";

export const watchMiddleware = async ({ headers, path }: any) => {
  const token = headers['x-token']

  let user: any;

  if (!customCache.get(token)) {
    user = await prismaClient.user.findFirst({
      where: { token }
    })
    customCache.set(token, user as any);
  } else {
    user = customCache.get(token);
  }

  const isEpisodeRoute = path.includes("/episode/");
  const isChaptersRoute = path.includes("/chapters/");

  if (user && (isEpisodeRoute || isChaptersRoute)) {
    const animeSlug = path.split("/").slice(-4, -2).join("/");
    const mangaSlug = path.split("/").slice(-1).join("/").replace(/-chapter.*/gi, "");
    const watchEpisode = path.split("/").reverse()[1] || "1";
    const readChapter = path.split("/").slice(-1).join("/").match(/-chapter-(.*)/i)?.[1] || "1";
    
    if (isEpisodeRoute) {
      const animeDetail: Partial<IAnimeDetail> = await KuramanimeParser.detailAnime(animeSlug);

      UserService.increaseWatchStatistics({
        user_id: user.id,
        anime_id: animeSlug
      }, {});

      UserService.updateAnimeHistory(user.id, {
        anime_id: animeSlug,
        cover: animeDetail.image,
        current_eps: (animeDetail.episodeList?.length || 1).toString(),
        date: animeDetail.airing?.from || "",
        rating: animeDetail.score,
        watch_eps: watchEpisode,
        schedule: animeDetail.scheduleDay || "",
        source: animeDetail.source,
        title: animeDetail.title,
        total_eps: animeDetail.episodes
      })
    } else if (isChaptersRoute) {
      const mangaDetail: Partial<MangaDetail> = await KiryuuParser.detail(mangaSlug);

      UserService.increaseWatchStatistics({}, {
        user_id: user.id,
        manga_id: mangaSlug
      });

      UserService.updateMangaHistory(user.id, {
        manga_id: mangaSlug,
        cover: mangaDetail.images?.cover,
        read_chapter: readChapter,
        title: mangaDetail.title,
        total_eps: String(mangaDetail.chapters?.length) || "1"
      })
    }
  }
}