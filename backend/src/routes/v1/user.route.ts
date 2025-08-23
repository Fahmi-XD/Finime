/**
 * SubRoute User ( Memerlukan Token Untuk Setiap Request )
 */

import UserController from "@controllers/user.controller.js";
import { Elysia } from "elysia";
import { adminMiddleware } from "@middleware/admin.middleware.js";

export const userRoute = (app: Elysia) => app

  .get("/user", UserController.getUser)
  .get("/user/username/:username", UserController.getUserByUsername)
  .get("/user/online", UserController.getUserOnline)
  // .get("/users", UserController.getAllUser, { beforeHandle: adminMiddleware }) // Memerlukan Token + Role Admin
  .patch("/user", UserController.updateUser)

  .post("/notification", UserController.pushNotif)
  .get("/live", UserController.onlineTracker)

  .group("/comment", (app) => app
    .post("/post", UserController.commentPostAnimeId)
    // .post("/reply", UserController.reply)

    // .delete("/reply/:replyId", UserController.deleteReply)
    .delete("/:commentId", UserController.deleteCommentId)

    .get("/", UserController.commentAnimeId)
  )

/**
 * Subroute SEMENTARA untuk testing penambahan nonton anime / manga
 * 
 * Kayaknya jangan dibuat endpoint khusus kayak ini,
 * tapi harusnya setiap User selesai nonton anime / manga ( selesai artinya menamatkan )
 * baru tambahin nilai nontonnya
 */
// .get("/watch", UserController.updateWatch)