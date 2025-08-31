/**
 * User Controller
 */

import HttpException from "@lib/httpException.js";
import ImageUpload from "@lib/uploadImage.js";
import UserService from "@services/user.service.js";
import { UpdateUserRequest } from "@models/user.model.js";
import { UserValidation } from "@validations/user.validation.js";
import { Context } from "elysia";
import { boolean, ZodError } from "zod";
import { CreateCommentRequest } from "@models/comment.model.js";
import type { ResponseModel } from "@models/response.model.js";
// import webpush from 'web-push';
import prismaClient from "@databases/prisma.client.js";
import Response from "@lib/response.js";

export default class UserController {

  // Online Tracker
  static async onlineTracker(context: Context): Promise<ResponseModel<any>> {
    const userId = (context.store as { userId: string }).userId;
    
    if (userId) {
      const response = await prismaClient.user.upsert({
        where: { id: userId },
        create: {
          id: userId,
          lastSeen: new Date(),
        },
        update: {
          lastSeen: new Date()
        },
        select: {
          lastSeen: true,
          name: true
        }
      });

      return Response.standarResponse(200, "1");
    }

    return Response.standarResponse(200, "0");
  }

  // Notification
  static async pushNotif(context: Context): Promise<ResponseModel<any>> {
    const response = await UserService.getUser((context.store as { userId: string }).userId);

    console.log("Anjay")

    return response;
  }

  // User Controller
  static async getUser(context: Context): Promise<ResponseModel<any>> {
    const isStatistics = !!context.query?.statistics || false;
    const username = context.query?.username || null;
    const response = await UserService.getUser((context.store as { userId: string }).userId, isStatistics, username);

    return response;
  }

  // User Controller
  static async getUserByUsername(context: Context): Promise<ResponseModel<any>> {
    const username = context.params?.username || null;
    const response = await UserService.getUser((context.store as { userId: string }).userId, false, username);

    return response;
  }

  // User Controller Online
  static async getUserOnline(context: Context): Promise<ResponseModel<any>> {
    const username = context.params?.username || null;
    const response = await UserService.getUser((context.store as { userId: string }).userId, false, username, true);

    return response;
  }

  // User Controller Online
  static async getUserHistory(context: Context): Promise<ResponseModel<any>> {
    const username = context.params?.username || null;
    const response = await UserService.getUser((context.store as { userId: string }).userId, false, username, false, true);

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
            const { link } = await ImageUpload.zanixonGroup(avatar);
            request.avatar = link;
          } catch (error) {
            console.log(error)
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

  // Mendapatkan Semua User atau Sesuai username || nama ( Controller )
  static async getAllUser(context: Context): Promise<ResponseModel<any>> {
    const query: string | boolean = context.query?.query || false;

    const response = await UserService.getAllUser(query);

    return response;
  }

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

  // Comment Anime ID
  static async commentAnimeId(context: Context): Promise<ResponseModel<any>> {
    const animeId = context.query.animeId as string;
    if (!animeId) return HttpException.standarException(400, { message: "Error" });
    const response = await UserService.getComment(animeId);
    return response;
  }

  // POST Comment Anime ID
  static async commentPostAnimeId(context: Context): Promise<ResponseModel<any>> {
    const userId = (context.store as { userId: string }).userId as string
    const animeId = (context.body as any).animeId as string;
    if (!animeId) return HttpException.standarException(400, { message: "Error" });
    const request = context.body as unknown as CreateCommentRequest;
    const response = await UserService.postComment(animeId, userId, request);
    return response;
  }

  // Delete Comment ID
  static async deleteCommentId(context: Context): Promise<ResponseModel<any>> {
    const userId = (context.store as { userId: string }).userId as string
    const commentId = context.params.commentId as string;
    if (!commentId) return HttpException.standarException(400, { message: "Error" });
    const response = await UserService.deleteComment(userId, commentId);
    return response;
  }

}