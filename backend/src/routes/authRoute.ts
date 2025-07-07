/**
 * SubRoute Autentikasi
 */

import AuthController from "@controllers/authController.js";
import { Elysia } from "elysia";

const authRoute = new Elysia()

  .group("/auth", (app) => app
    .post("/register", AuthController.register)
    .post("/login", AuthController.login)
  )

export default authRoute;