/**
 * SubRoute User ( Memerlukan Token Untuk Setiap Request )
 */

import UserController from "@controllers/userController";
import { Elysia } from "elysia";
import { adminMiddleware } from "middleware/adminMiddleware";

const userRoute = new Elysia()

  .get("/user", UserController.getUser)
  .get("/users", UserController.getAllUser, { beforeHandle: adminMiddleware }) // Memerlukan Token + Role Admin
  .patch("/user", UserController.updateUser)

  /**
   * Subroute SEMENTARA untuk testing penambahan nonton anime / manga
   * 
   * Kayaknya jangan dibuat endpoint khusus kayak ini,
   * tapi harusnya setiap User selesai nonton anime / manga ( selesai artinya menamatkan )
   * baru tambahin nilai nontonnya
   */
  .get("/watch", UserController.updateWatch)

export default userRoute;