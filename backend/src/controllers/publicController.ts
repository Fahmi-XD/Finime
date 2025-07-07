/**
 * Controller Untuk Route Yang Tidak Perlu Pakai Middleware Auth ( X-Token )
 */

import HttpException from "@lib/httpException.js";
import StringSimilarity from "@lib/similarity.js";
import { MyanimeListParser } from "@scrapers/anime/myanimelist/api/myanimelistApi.js";
import { Context } from "elysia";
import axios from "axios";

export default class PublicController {

  // Badge Controller
  static getAllBadges() {
    const badges = [
      {
        id: "karbit",
        name: "Karbit",
        icon: "Zap",
        iconColor: "text-pink-500",
        textColor: "text-pink-200"
      },
      {
        id: "crypto",
        name: "Crypto",
        icon: "Bitcoin",
        iconColor: "text-yellow-500",
        textColor: "text-yellow-200"
      },
      {
        id: "nolep",
        name: "Nolep",
        icon: "Gamepad2",
        iconColor: "text-red-500",
        textColor: "text-red-200"
      },
      {
        id: "contributor",
        name: "Contibutor",
        icon: "Handshake",
        iconColor: "text-green-500",
        textColor: "text-green-200"
      },
    ]

    return badges;
  }

  static async toAnimeList(context: Context) {
    const q = context.params.query || "";
    const search = await MyanimeListParser.searchAnime(q);
    if (search.animeList.length === 0) {
      return HttpException.standarException(404, { message: "Anime Not Found." });
    }

    const anime = StringSimilarity.sortMatch(q, search.animeList.map(item => item.title));

    for (let i = 0; i < anime.length; i++) {
      (anime[i] as any)["myanimelist"] = search.animeList[anime[i].index];
    }

    const charInfo = await MyanimeListParser.getVoiceandChars((anime[0] as any)["myanimelist"].animeId);
    (anime[0] as any)["characters"] = charInfo;

    const charFullInfo = await MyanimeListParser.getFullAnime((anime[0] as any)["myanimelist"].animeId);
    (anime[0] as any)["fullInfo"] = charFullInfo;

    return anime;
  }

  static async proxyMedia(context: Context) {
    try {
      const targetUrl = context.query.mediaUrl;
      const response = await axios.get(targetUrl, {
        responseType: 'stream',
        headers: {
          'User-Agent': context.request.headers.get("user-agent") || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          'Accept': context.request.headers.get("accept") || '*/*',
        },
        timeout: 10_000,
      });

      context.set.status = response.status;
      for (const [name, value] of Object.entries(response.headers)) {
        if (name.toLowerCase() === 'transfer-encoding') continue;
        context.set.headers[name] = value;
      }

      return response.data;
    } catch (error) {
      console.error("Error in proxyMedia:", error);
      return HttpException.standarException(502, { message: "Failed to fetch media." });
    }
  }

}