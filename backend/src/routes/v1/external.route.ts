/**
 * SubRoute External ( Anime & Manga )
 */

import Elysia from "elysia";
import cacheMiddleware from "@middleware/cache.middleware.js";
import { watchMiddleware } from "@middleware/watch.middleware.js";
import { 
  myAnimeListRoute, otakudesuRoute, kuramanimeRoute, // Anime
  kiryuuRoute // Manga
} from "@external/scrapers/index.js";

export const externalRoute = new Elysia()

  // Middlware Cache
  .use(cacheMiddleware(8)) // 1 menit
  .onBeforeHandle(watchMiddleware)

  // Anime Group Routing
  .group("/anime", (app) => app
  .use(myAnimeListRoute)
  .use(otakudesuRoute)
  .use(kuramanimeRoute)
)

  // Manga Group Routing
  .group("/manga", (app) => app
    .use(kiryuuRoute)
  )