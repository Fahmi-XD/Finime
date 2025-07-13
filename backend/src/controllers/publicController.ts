/**
 * Controller Untuk Route Yang Tidak Perlu Pakai Middleware Auth ( X-Token )
 */

import HttpException from "@lib/httpException.js";
import { StringSimilarity } from "@lib/similarity.js";
import { Context } from "elysia";
import axios from "axios";
import Response from "@lib/response";

export default class PublicController {

  // Badge Controller
  static getAllBadges() {
    const badges = [
      {
        id: "karbit",
        name: "Karbit",
        icon: "Zap",
      },
      {
        id: "crypto",
        name: "Crypto",
        icon: "Bitcoin",
      },
      {
        id: "nolep",
        name: "Nolep",
        icon: "Gamepad2",
      },
      {
        id: "contributor",
        name: "Contibutor",
        icon: "Handshake",
      },
      {
        id: "early-user",
        name: "Early User",
        icon: "Star",
      },
      {
        id: "anime-lover",
        name: "Anime Lover",
        icon: "Heart",
      },
      {
        id: "manga-lover",
        name: "Manga Lover",
        icon: "BookOpen",
      },
    ]

    return Response.standarResponse(200, badges);
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