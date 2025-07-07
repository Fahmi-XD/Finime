import Elysia from "elysia";
import KomikuController from "../controllers/komikuController.js";
import { watchMiddleware } from "@middleware/watchMiddleware.js";

export const komikuRoute = (app: Elysia) => app
  .group("/komiku", (app) => app
    .get("/page/:page", KomikuController.paginationManga)
    .get("/popular/:page", KomikuController.getPopularMangaPage)
    .get("/search", KomikuController.searchManga)
    .get("/detail/:slug", KomikuController.getMangaDetail)
    .get("/chapter/:slug", KomikuController.getChapterDetail, {
      beforeHandle: watchMiddleware
    })
    .get("/news", KomikuController.getMangaUpdate)

  )
