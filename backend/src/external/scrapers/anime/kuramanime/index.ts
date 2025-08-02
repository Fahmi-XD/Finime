import { Context, Elysia } from "elysia";
import { KuramanimeParser } from "./api.parser.js";
import Response from "@lib/response.js";

export const kuramanimeRoute = new Elysia()
  .group("/kuramanime", (app) => app

    .get("/search", async (ctx: Context) => {
      const query = ctx.query.query || "";

      return Response.standarResponse(200, await KuramanimeParser.searchAnime(query));
    })

  );