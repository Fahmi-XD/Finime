import { Context, Elysia } from "elysia";
import { KuramanimeParser } from "./api.parser.js";
import Response from "@lib/response.js";

import { getToken } from "./token.helper.js";

export const kuramanimeRoute = new Elysia()
  .group("/kuramanime", (app) => app
  
    .get("/home", async (ctx: Context) => {
      return Response.standarResponse(200, await KuramanimeParser.homeAnime());
    })

    .get("/summer", async (ctx: Context) => {
      return Response.standarResponse(200, await KuramanimeParser.summerAnime());
    })

    .get("/search", async (ctx: Context) => {
      const query = ctx.query.query || "";
      const page = ctx.query.page || "1";

      return Response.standarResponse(200, await KuramanimeParser.searchAnime(query, page));
    })

    .get("/detail/:id/:slug", async (ctx: Context) => {
      const slug = `${ctx.params.id}/${ctx.params.slug}` || "3802/game-center-shoujo-to-ibunka-kouryuu";

      return Response.standarResponse(200, await KuramanimeParser.detailAnime(slug));
    })

    .get("/episode/:id/:slug/:eps/:server", async (ctx: Context) => {
      const token = await getToken();

      const slug = `${ctx.params.id}/${ctx.params.slug}/episode/${ctx.params.eps}?${token.key}=${token.value}&${token.key2}=${ctx.params.server}&page=1` || "3802/game-center-shoujo-to-ibunka-kouryuu/episode/1";

      return Response.standarResponse(200, await KuramanimeParser.episodeAnime(slug));
    })

  );