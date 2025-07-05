/**
 * SubRoute Anime
 */

import { otakudesuRoute } from "@scrapers/index";

import Elysia from "elysia";
import cacheMiddleware from "middleware/cacheMiddleware";

const animeRoute = new Elysia()

  // Middlware Cache
  .use(cacheMiddleware()) // 1 menit

  .group("/anime", (app) => app
    .use(otakudesuRoute) // Scrape dari website Otakudesu

  )

export default animeRoute;