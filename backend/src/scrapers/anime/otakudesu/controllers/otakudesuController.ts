import { getPageParam, getQParam } from "@lib/queryParams.js";
import OtakudesuParser from "../parsers/OtakudesuParser.js";
import otakudesuInfo from "../info/otakudesuInfo.js";
import generatePayload from "../helper/payload.js";
import path from "path";
import fs from "fs";
import { Context } from "elysia";

const { baseUrl, baseUrlPath } = otakudesuInfo;
const parser = new OtakudesuParser(baseUrl, baseUrlPath);

const otakudesuController = {
  getMainView: async (ctx: Context) => {
    try {
      const getViewFile = (filePath: string) => {
        return path.join(__dirname, "..", "..", "..", "public", "views", filePath);
      };
      const filePath = getViewFile("anime-source.html");
      ctx.set.headers["Content-Type"] = "text/html";
      const html = fs.readFileSync(filePath, "utf-8");
      return html;
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getMainViewData: async (ctx: Context) => {
    try {
      const data = otakudesuInfo;
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getHome: async (ctx: Context) => {
    try {
      const data = await parser.parseHome();
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getSchedule: async (ctx: Context) => {
    try {
      const data = await parser.parseSchedule();
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getAllAnimes: async (ctx: Context) => {
    try {
      const data = await parser.parseAllAnimes();
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getAllGenres: async (ctx: Context) => {
    try {
      const data = await parser.parseAllGenres();
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getOngoingAnimes: async (ctx: Context) => {
    try {
      const page = getPageParam(ctx.query);
      if (page instanceof Response) {
        return page;
      }
      const { data, pagination } = await parser.parseOngoingAnimes(page as number);
      return generatePayload({ data, pagination });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getCompletedAnimes: async (ctx: Context) => {
    try {
      const page = getPageParam(ctx.query);
      if (page instanceof Response) {
        return page;
      }
      const { data, pagination } = await parser.parseCompletedAnimes(page as number);
      return generatePayload({ data, pagination });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getSearch: async (ctx: Context) => {
    try {
      const q = getQParam(ctx.query);
      if (q instanceof Response) {
        return q;
      }
      const data = await parser.parseSearch(q as string);
      return generatePayload({ data });
    } catch (error) {
      console.log(error)
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getGenreAnimes: async (ctx: Context) => {
    try {
      const page = getPageParam(ctx.query);
      if (page instanceof Response) {
        return page;
      }
      const { genreId } = ctx.params;
      const { data, pagination } = await parser.parseGenreAnimes(genreId, page as number);
      return generatePayload({ data, pagination });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getAnimeDetails: async (ctx: Context) => {
    try {
      const { animeId } = ctx.params;
      const data = await parser.parseAnimeDetails(animeId);
      return generatePayload({ data });
    } catch (error) {
      console.log(error);
      ctx.set.status = 500;
      return { error: (error as any).message };
    }
  },

  getAnimeEpisode: async (ctx: Context) => {
    try {
      const { episodeId } = ctx.params;
      const data = await parser.parseAnimeEpisode(episodeId);
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getServerUrl: async (ctx: Context) => {
    try {
      const { serverId } = ctx.params;
      const data = await parser.parseServerUrl(serverId);
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },

  getAnimeBatch: async (ctx: Context) => {
    try {
      const { batchId } = ctx.params;
      const data = await parser.parseAnimeBatch(batchId);
      return generatePayload({ data });
    } catch (error) {
      ctx.set.status = 500;
      return { error: error instanceof Error ? error.message : String(error) };
    }
  },
};

export default otakudesuController;
