/**
 * Controller Untuk Manga
 */

import { Context } from "elysia";
import { AxiosError } from "axios";

import { Komiku } from "../scrapers";

export default class MangaController {

  // Get Popular Manga With Page
  static async getPopularMangaPage(context: Context) {
    try {
      const page = context.params.page || "1";
      const response = await Komiku.getPopularManga(page);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

  // Search Manga
  static async searchManga(context: Context) {
    try {
      const query = context.query.q || "roshidere";
      const response = await Komiku.searchManga(query);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

  // Pagination Manga
  static async paginationManga(context: Context) {
    try {
      const page = context.params.page || "1";
      const response = await Komiku.mangaPagination(page);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

  // Get Manga Detail
  static async getMangaDetail(context: Context) {
    try {
      const slug = context.params.slug || "tokidoki";
      const response = await Komiku.getMangaDetail(slug);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

  // Get Chapter Detail
  static async getChapterDetail(context: Context) {
    try {
      const slug = context.params.slug || "tokidoki";
      const response = await Komiku.getChapterDetail(slug);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data || {};
      }
    }
  }

}