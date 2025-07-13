/**
 * SubRoute User ( Memerlukan Token Untuk Setiap Request )
 */

import UserController from "@controllers/userController.js";
import { Elysia } from "elysia";
import { adminMiddleware } from "@middleware/adminMiddleware.js";

export const userRoute = (app: Elysia) => app

  .get("/user", UserController.getUser)
  // .get("/users", UserController.getAllUser, { beforeHandle: adminMiddleware }) // Memerlukan Token + Role Admin
  .patch("/user", UserController.updateUser)

  .group("/comment", (app) => app
    // .post("/reply", UserController.reply)
    // .post("/:animeId", UserController.commentPostAnimeId)

    // .delete("/reply/:replyId", UserController.deleteReply)
    // .delete("/:commentId", UserController.deleteCommentId)

    // .get("/:animeId", UserController.commentAnimeId)
  )

/**
 * Subroute SEMENTARA untuk testing penambahan nonton anime / manga
 * 
 * Kayaknya jangan dibuat endpoint khusus kayak ini,
 * tapi harusnya setiap User selesai nonton anime / manga ( selesai artinya menamatkan )
 * baru tambahin nilai nontonnya
 */
// .get("/watch", UserController.updateWatch)