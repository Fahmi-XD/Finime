/**
 * SubRoute Publik ( Tidak Memerlukan Token Ketika Request )
 */

import PublicController from "@controllers/public.controller.js";
import Elysia from "elysia";
import cacheMiddleware from "@middleware/cache.middleware.js";

// Middleware untuk Cache
const cacheMiddlewareRoute = new Elysia()

  //Middleware untuk cache
  .use(cacheMiddleware(6))
  .get("/badges", PublicController.getAllBadges)

export const publicRoute = (app: Elysia) => app

  .use(cacheMiddlewareRoute)
  .get("/proxy-media", PublicController.proxyMedia)
  .get("/server/status", PublicController.serverStatus)