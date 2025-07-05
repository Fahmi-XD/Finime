import controller from "../controllers/otakudesuController";
import Elysia from "elysia";

export const otakudesuRoute = (app: Elysia) => app
  .group("/otakudesu", (app) => app
    // .get("/", controller.getMainView)
    .get("/view-data", controller.getMainViewData)
    .get("/home", controller.getHome)
    .get("/schedule", controller.getSchedule)
    .get("/anime", controller.getAllAnimes)
    .get("/genres", controller.getAllGenres)
    .get("/ongoing", controller.getOngoingAnimes)
    .get("/completed", controller.getCompletedAnimes)
    .get("/search", controller.getSearch)
    .get("/genres/:genreId", controller.getGenreAnimes)
    .get("/anime/:animeId", controller.getAnimeDetails)
    .get("/episode/:episodeId", controller.getAnimeEpisode)
    .get("/server/:serverId", controller.getServerUrl)
    .post("/server/:serverId", controller.getServerUrl)
    .get("/batch/:batchId", controller.getAnimeBatch)
)
