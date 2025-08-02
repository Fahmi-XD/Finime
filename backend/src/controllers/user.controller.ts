/**
 * User Controller
 */

import HttpException from "@lib/httpException.js";
import ImageUpload from "@lib/uploadImage.js";
import UserService from "@services/user.service.js";
import { UpdateUserRequest } from "@models/user.model.js";
import { UserValidation } from "@validations/user.validation.js";
import { Context } from "elysia";
import { ZodError } from "zod";
import { CreateCommentRequest, ReplyCommentRequest } from "@models/comment.model.js";
import type { ResponseModel } from "@models/response.model.js";

export default class UserController {

  // User Controller
  static async getUser(context: Context): Promise<ResponseModel<any>> {
    const response = await UserService.getUser((context.store as { userId: string }).userId);

    return response;
  }

  // Update User Controller
  static async updateUser(context: Context): Promise<ResponseModel<any>> {
    try {
      const contentType = context.headers["content-type"];

      let request: UpdateUserRequest = {};
      request = UserValidation.UPDATE_USER.parse(request);

      if (contentType?.includes("multipart/form-data")) {
        const formData = await context.request.formData() as FormData;
        const avatar = formData.get("avatar") as File | string | null;

        if (avatar instanceof File) {
          try {
            const { link } = await ImageUpload.zanixonGroupMirror(avatar);
            // const { link } = await ImageUpload.freeHosting(avatar);
            request.avatar = link;
          } catch (error) {
            return HttpException.standarException(500, { error: "Failed to upload image" });
          }
        } else if (typeof avatar === "string") {
          request.avatar = avatar;
        }

        formData.forEach((value, key) => {
          if (key === "avatar") return;
          request[key as keyof UpdateUserRequest] = value as any;
        });
      } else if (contentType?.includes("application/json")) {
        request = (await context.request.json() as UpdateUserRequest);
      } else {
        return HttpException.standarException(400, { error: "Unsupported Content-Type" });
      }

      const response = await UserService.updateUser((context.store as { userId: string }).userId, request);
      return response;
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(400, { message: (error as any).message })
      }
    }
  }

  // // Mendapatkan Profile User Berdasarkan Username ( Controller )
  // static async getUserProfile(context: Context): Promise<ResponseModel<any>> {
  //   const username = context.params.username;
  //   const response = await UserService.getUserProfile(username);

  //   return response;
  // }

  // // Mendapatkan Semua User ( Controller )
  // static async getAllUser(): Promise<ResponseModel<any>> {
  //   const response = await UserService.getAllUser();

  //   return response;
  // }

  // // Reply
  // static async reply(context: Context): Promise<ResponseModel<any>> {
  //   const userId = (context.store as { userId: string }).userId as string
  //   const request = (await context.request.json()) as ReplyCommentRequest;
  //   const response = await UserService.replyComment(userId, request);
  //   return {
  //     data: response,
  //   };
  // }

  // // Delete Reply
  // static async deleteReply(context: Context): Promise<ResponseModel<any>> {
  //   const userId = (context.store as { userId: string }).userId as string
  //   const replyId = context.params.replyId as string;
  //   if (!replyId) return HttpException.standarException(400, { message: "Error" });
  //   const response = await UserService.deleteReplyComment(userId, replyId);
  //   return {
  //     data: response,
  //   };
  // }

  // // Comment Anime ID
  // static async commentAnimeId(context: Context): Promise<ResponseModel<any>> {
  //   const animeId = context.params.animeId as string;
  //   if (!animeId) return HttpException.standarException(400, { message: "Error" });
  //   const response = await UserService.getComment(animeId);
  //   return {
  //     data: response,
  //   };
  // }

  // // POST Comment Anime ID
  // static async commentPostAnimeId(context: Context): Promise<ResponseModel<any>> {
  //   const userId = (context.store as { userId: string }).userId as string
  //   const animeId = context.params.animeId as string;
  //   if (!animeId) return HttpException.standarException(400, { message: "Error" });
  //   const request = (await context.request.json()) as CreateCommentRequest;
  //   const response = await UserService.postComment(animeId, userId, request);
  //   return {
  //     data: response,
  //   };
  // }

  // // Delete Comment ID
  // static async deleteCommentId(context: Context): Promise<ResponseModel<any>> {
  //   const userId = (context.store as { userId: string }).userId as string
  //   const commentId = context.params.commentId as string;
  //   if (!commentId) return HttpException.standarException(400, { message: "Error" });
  //   const response = await UserService.deleteComment(userId, commentId);
  //   return {
  //     data: response,
  //   };
  // }

}