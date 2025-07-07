/**
 * SubRoute Anime
 */

import { myanimelistRoute, otakudesuRoute } from "@scrapers/index.js";

import Elysia from "elysia";
import cacheMiddleware from "@middleware/cacheMiddleware.js";

const animeRoute = new Elysia()

  // Middlware Cache
  .use(cacheMiddleware()) // 1 menit

  .group("/anime", (app) => app
    .use(otakudesuRoute) // Scrape dari website Otakudesu
    .use(myanimelistRoute) // Scrape dari website Myanimelist

  )

export default animeRoute;