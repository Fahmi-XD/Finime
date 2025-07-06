/**
 * SubRoute Publik ( Tidak Memerlukan Token Ketika Request )
 */

import PublicController from "@controllers/publicController";
import UserController from "@controllers/userController";
import Elysia from "elysia";
import cacheMiddleware from "middleware/cacheMiddleware";

// Middleware untuk Cache
const cacheMiddlewareRoute = new Elysia()

  //Middleware untuk cache
  .use(cacheMiddleware())

  .get("/badges", PublicController.getAllBadges)

// Routing Utama
const publicRoute = new Elysia()

  .use(cacheMiddlewareRoute)
  .get("/user/:username", UserController.getUserProfile)
  .get("/to-myanimelist/:query", PublicController.toAnimeList)
  .get("/proxy-media", PublicController.proxyMedia)

export default publicRoute;