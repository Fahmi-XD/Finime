/**
 * SubRoute Publik ( Tidak Memerlukan Token Ketika Request )
 */

import PublicController from "@controllers/publicController.js";
import UserController from "@controllers/userController.js";
import Elysia from "elysia";
import cacheMiddleware from "@middleware/cacheMiddleware.js";

// Middleware untuk Cache
const cacheMiddlewareRoute = new Elysia()

  //Middleware untuk cache
  .use(cacheMiddleware(6))
  .get("/badges", PublicController.getAllBadges)

export const publicRoute = (app: Elysia) => app

  .use(cacheMiddlewareRoute)
  // .get("/user/:username", UserController.getUserProfile)
  .get("/proxy-media", PublicController.proxyMedia)