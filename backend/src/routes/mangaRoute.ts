/**
 * SubRoute Manga
 */

import { komikuRoute } from "@scrapers/index";

import Elysia from "elysia";
import cacheMiddleware from "middleware/cacheMiddleware";

const mangaRoute = new Elysia()

  // Middlware Cache
  .use(cacheMiddleware()) // 1 menit

  .group("/manga", (app) => app
    .use(komikuRoute) // Scrape dari website komiku

  )

export default mangaRoute;