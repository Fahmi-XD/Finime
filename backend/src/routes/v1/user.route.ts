/**
 * SubRoute User ( Memerlukan Token Untuk Setiap Request )
 */

import UserController from "@controllers/user.controller.js";
import { Elysia } from "elysia";

export const userRoute = (app: Elysia) => app

  .get("/user", UserController.getUser)
  .get("/user/username/:username", UserController.getUserByUsername)
  .get("/user/online", UserController.getUserOnline)
  .get("/user/history", UserController.getUserHistory)

  .get("/users", UserController.getAllUser)

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