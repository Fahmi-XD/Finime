import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import authRoute from "@routes/authRoute";
import userRoute from "@routes/userRoute";
import publicRoute from "@routes/publicRoute";
import HttpException from "@lib/httpException";

const app = new Elysia()
  .use(cors())

  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return HttpException.standarException(404, { message: "halaman tidak ditemukan" });
    }
  })

  .get("/", () => {
    return {
      message: "Service active."
    }
  })

  // v1
  .group("/api/v1", (app) => app
    // Subrouter Auth
    .use(authRoute)

    // Subrouter User + Middleware
    .use(userRoute)

    // Subrouter Public ( No protect middleware )
    .use(publicRoute)
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
