/**
 * SubRoute External ( Anime & Manga )
 */

import Elysia from "elysia";
import cacheMiddleware from "@middleware/cacheMiddleware.js";
import { myAnimeListRoute, otakudesuRoute } from "@external/scrapers/index.js";

export const externalRoute = new Elysia()

  // Middlware Cache
  .use(cacheMiddleware(8)) // 1 menit

  .group("/anime", (app) => app
    .use(myAnimeListRoute)
    .use(otakudesuRoute)
  )