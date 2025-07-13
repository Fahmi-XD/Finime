import { Context, Elysia } from "elysia";
import { OtakudesuApiParser } from "./apiParser.js";
import Response from "@lib/response.js";

export const otakudesuRoute = new Elysia()
  .group("/otakudesu", (app) => app

    .get("/search", async (ctx: Context) => {
      const query = ctx.query.query || "";

      return Response.standarResponse(200, await OtakudesuApiParser.searchAnime(query));
    })
    .get("/detail/:slug", async (ctx: Context) => {
      const slug = ctx.params.slug || "";

      return Response.standarResponse(200, await OtakudesuApiParser.getDetailAnime(slug));
    })
    .get("/stream/:id", async (ctx: Context) => {
      const id = ctx.params.id || "";
      const reso = ctx.query.reso || "360p";

      return Response.standarResponse(200, await OtakudesuApiParser.getStreamAnime(id, reso));
    })
    .get("/find-title", async (ctx: Context) => {
      const title = ctx.query.title || "";

      return Response.standarResponse(200, await OtakudesuApiParser.findByTitle(title));
    })

  );