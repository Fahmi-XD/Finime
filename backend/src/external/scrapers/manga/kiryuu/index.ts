import { Context, Elysia } from "elysia";
import { KiryuuParser } from "./parser.js";
import Response from "@lib/response.js";

export const kiryuuRoute = new Elysia()
  .group("/kiryuu", (app) => app
  
    .get("/by-genre", async (ctx: Context) => {
      const genre = ctx.query.genre || "romance"
      const page = ctx.query.page || "1";
      return Response.standarResponse(200, await KiryuuParser.byGenre(genre, page));
    })
  
    .get("/search", async (ctx: Context) => {
      const query = ctx.query.query || "Alya"
      return Response.standarResponse(200, await KiryuuParser.search(query));
    })
  
    .get("/detail/:slug", async (ctx: Context) => {
      const slug = ctx.params.slug || "tonari-no-seki-no-inkya-joshi-ga-oshi-utaite-datta-ore-no-kyoku-wo-uttatekure"
      return Response.standarResponse(200, await KiryuuParser.detail(slug.replace(/-chapter.*/gi, "")));
    })
  
    .get("/chapters/:slug", async (ctx: Context) => {
      const slug = ctx.params.slug || "onari-no-seki-no-inkya-joshi-ga-oshi-utaite-datta-ore-no-kyoku-wo-uttatekure-chapter-11-2"
      return Response.standarResponse(200, await KiryuuParser.chapterImage(slug));
    })

  );