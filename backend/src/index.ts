import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { helmet } from "elysia-helmet";
import cache from "elysia-cache";

import authRoute from "@routes/authRoute";
import userRoute from "@routes/userRoute";
import mangaRoute from "@routes/mangaRoute";
import publicRoute from "@routes/publicRoute";
import HttpException from "@lib/httpException";
import { authMiddleware } from "middleware/authMiddleware";
import animeRoute from "@routes/animeRoute";

const protectedRoute = new Elysia()
  // Middlewarenya
  .onBeforeHandle(authMiddleware)

  // Subrouter User
  .use(userRoute)

const app = new Elysia()
  .use(cors())
  .use(helmet())
  .use(cache({
    max: 80
  }))

  .onError(({ code }) => {
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

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
