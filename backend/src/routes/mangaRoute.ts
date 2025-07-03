/**
 * SubRoute Manga
 */

import MangaController from "@controllers/mangaController";
import Elysia from "elysia";
import cacheMiddleware from "middleware/cacheMiddleware";

const mangaRoute = new Elysia()

  // Middlware Cache
  .use(cacheMiddleware())

  .group("/manga", (app) => app
    .get("/page/:page", MangaController.paginationManga)
    .get("/popular/:page", MangaController.getPopularMangaPage)
    .get("/search", MangaController.searchManga)
    .get("/detail/:slug", MangaController.getMangaDetail)
    .get("/chapter/:slug", MangaController.getChapterDetail)

  )

export default mangaRoute;