/**
 * SubRoute Publik ( Tidak Memerlukan Token Ketika Request )
 */

import PublicController from "@controllers/publicController";
import UserController from "@controllers/userController";
import Elysia from "elysia";

const publicRoute = new Elysia()

  .get("/badges", PublicController.getAllBadges)
  .get("/user/:username", UserController.getUserProfile)

export default publicRoute;