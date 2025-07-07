import "dotenv/config.js";
import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import * as cache from "elysia-cache";

import authRoute from "@routes/authRoute.js";
import userRoute from "@routes/userRoute.js";
import mangaRoute from "@routes/mangaRoute.js";
import publicRoute from "@routes/publicRoute.js";
import HttpException from "@lib/httpException.js";
import { authMiddleware } from "middleware/authMiddleware.js";
import animeRoute from "@routes/animeRoute.js";

const PORT = process.env.PORT || 3000;

const protectedRoute = new Elysia()
  // Middlewarenya
  .onBeforeHandle(authMiddleware)

  // Subrouter User
  .use(userRoute)

const app = new Elysia()
  .use(cors())
  .use(cache.cache({
    max: 80
  }))

  .onError(({ code }: { code: any }) => {
    if (code === "NOT_FOUND") {
      return HttpException.standarException(404, { message: "halaman tidak ditemukan" });
    }
  })

  // Route Utama ( Gakguna jir 😂 )
  .get("/", () => {
    return {
      message: "Service active.",
      source: "Finime"
    }
  })

  // v1
  .group("/api/v1", (app) => app
    // Subrouter Public ( No protect middleware )
    .use(authRoute)
    .use(publicRoute)
    .use(mangaRoute)
    .use(animeRoute)

    // Subrouter Anime & Manga ( Protect middleware )
    .use(protectedRoute)
  )
  // .listen(PORT)

export const GET = app.handle
export const POST = app.handle
export const PATCH = app.handle
export const PUT = app.handle
export const OPTIONS = app.handle

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);