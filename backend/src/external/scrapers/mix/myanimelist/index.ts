import { Context, Elysia } from "elysia";
import { MyAnimeListApiParser } from "./apiParser.js";
import Response from "@lib/response.js";
import { IStatisticsStandarResponse } from "@models/anime/statisticsResponseModel.js";
import { ICharacterStandarResponse } from "@models/anime/characterResponseModel.js";
import { IStaffStandarResponse } from "@models/anime/staffResponseModel.js";
import { IEpisodesStandarResponse } from "@models/anime/episodesResponseModel.js";
import HttpException from "@lib/httpException.js";

export const myAnimeListRoute = new Elysia()
  .group("/myanimelist", (app) => app

    .get("/recent", async (ctx: Context) => {
      const page = ctx.query.page || "1";

      return Response.standarResponse(200, await MyAnimeListApiParser.getRecentAnimeList(page));
    })
    .get("/search", async (ctx: Context) => {
      const query = ctx.query.query || "";

      return Response.standarResponse(200, await MyAnimeListApiParser.getSearchAnimeList(query));
    })
    .get("/top", async (ctx: Context) => {
      const page = ctx.query.page || "1";

      return Response.standarResponse(200, await MyAnimeListApiParser.getTopAnimeList(page));
    })
    .get("/season-now", async (ctx: Context) => {
      const page = ctx.query.page || "1";

      return Response.standarResponse(200, await MyAnimeListApiParser.getSeasonNowAnimeList(page));
    })
    .get("/detail/:mal_id", async (ctx: Context) => {
      const mal_id = ctx.params.mal_id || "";
      const detail = await MyAnimeListApiParser.getDetailAnimeFull(mal_id);

      if (detail.status == "404") {
        return HttpException.standarException(404, { message: "Anime not found" });
      }

      if (Object.keys(detail).length == 0) {
        return HttpException.standarException(404, { message: "Anime not found" });
      }

      return Response.standarResponse(200, detail);
    })

  );