/**
 * User Controller
 */

import HttpException from "@lib/httpException";
import ImageUpload from "@lib/uploadImage";
import UserService from "@services/userService";
import { UpdateUserRequest } from "@typing/userType";
import { UserValidation } from "@validations/userValidation";
import { Context } from "elysia";
import { ZodError } from "zod";

export default class UserController {

  // User Controller
  static async getUser(context: Context): Promise<any> {
    const response = await UserService.getUser((context.store as { userId: string }).userId);

    return response;
  }

  // Update User Controller
  static async updateUser(context: Context): Promise<any> {
    try {
      const contentType = context.headers["content-type"];

      let request: UpdateUserRequest = {};
      request = UserValidation.UPDATE_USER.parse(request);

      if (contentType?.includes("multipart/form-data")) {
        const formData = await context.request.formData();
        const avatar = formData.get("avatar") as File | string | null;

        if (avatar instanceof File) {
          try {
            const { link } = await ImageUpload.freeHosting(avatar);
            request.avatar = link;
          } catch (error) {
            return HttpException.standarException(500, { error: "Failed to upload image" });
          }
        } else if (typeof avatar === "string") {
          request.avatar = avatar;
        }

        ["username", "name", "email", "first_name", "last_name", "bio"].forEach(
          (field) => {
            const value = formData.get(field);
            request[field as keyof UpdateUserRequest] = value as any
          },
        );
      } else if (contentType?.includes("application/json")) {
        request = await context.request.json();
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

  // Mendapatkan Profile User Berdasarkan Username ( Controller )
  static async getUserProfile(context: Context) {
    const username = context.params.username;
    const response = await UserService.getUserProfile(username);
    
    return response;
  }

  // Update Total Menonton ( Controller )
  static async updateWatch(context: Context) {
    // params ==> ( userId, animeIncrease? boolean, mangaIncrease? boolean )
    const response = await UserService.updateWatch((context.store as { userId: string }).userId, true, false);

    return response;
  }

  // Mendapatkan Semua User ( Controller )
  static async getAllUser() {
    const response = await UserService.getAllUser();

    return response;
  }

}