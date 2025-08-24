/**
 * Middleware Penambah Total Nonton Manga, Anime dan Otomatis menambah ke history ketika ada anime yang baru saja ditonton
 */

import prismaClient from "@databases/prisma.client.js"
import { customCache } from "@lib/cache.js"
import UserService from "@services/user.service.js";
import { KuramanimeParser } from "@external/scrapers/anime/kuramanime/api.parser.js";
import type { IAnimeDetail } from "@external/scrapers/anime/kuramanime/detail.model.js";

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

  const isEpisodeRoute = path.includes("/episode");

  if (user && isEpisodeRoute) {
    const animeSlug = path.split("/").slice(-4, -2).join("/")
    const animeDetail: Partial<IAnimeDetail> = await KuramanimeParser.detailAnime(animeSlug);
    Promise.all([
      UserService.increaseWatchStatistics({
        user_id: user.id,
        anime_id: animeSlug
      }, {}),

      UserService.updateAnimeHistory(user.id, {
        anime_id: animeSlug,
        cover: animeDetail.image,
        current_eps: (animeDetail.episodeList?.length || 1).toString(),
        date: animeDetail.airing?.from || "",
        rating: animeDetail.score,
        schedule: animeDetail.scheduleDay || "",
        source: animeDetail.source,
        title: animeDetail.title,
        total_eps: animeDetail.episodes
      })
    ])
  }
}