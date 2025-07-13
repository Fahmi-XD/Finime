import Elysia from "elysia";
import MyanimelistController from "../controllers/myanimelistController.js";

export const myanimelistRoute = (app: Elysia) => app
  .group("/myanimelist", (app) => app
    .get("/search", MyanimelistController.searchAnime)
    .get("/characters-actors/:animeId", MyanimelistController.getVoiceandCharacters)
    .get("/full/:animeId", MyanimelistController.getFullAnime)

  )
