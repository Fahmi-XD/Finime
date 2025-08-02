/**
 * SubRoute Autentikasi
 */

import { AuthController } from "@controllers/auth.controller.js";
import { Elysia } from "elysia";

export const authRoute = (app: Elysia) => app

  .group("/auth", (app) => app
    .post("/register", AuthController.register)
    .post("/login", AuthController.login)
  )