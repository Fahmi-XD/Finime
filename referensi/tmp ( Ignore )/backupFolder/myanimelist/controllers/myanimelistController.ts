/**
 * Controller Untuk Manga
 */

import { Context } from "elysia";
import { AxiosError } from "axios";
import { MyanimeListParser } from "../api/myanimelistApi.js";

export default class AnimeListController {

  // Search Anime
  static async searchAnime(context: Context) {
    try {
      const q = context.query.q || "";
      const response = await MyanimeListParser.searchAnime(q);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

  // Get Characters and Voice actors
  static async getVoiceandCharacters(context: Context) {
    try {
      const animeId = context.params.animeId || "";
      const response = await MyanimeListParser.getVoiceandChars(animeId);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

  // Get Characters and Voice actors
  static async getFullAnime(context: Context) {
    try {
      const animeId = context.params.animeId || "";
      const response = await MyanimeListParser.getFullAnime(animeId);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

}