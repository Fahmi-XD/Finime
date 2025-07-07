/**
 * Controller Untuk Autentikasi
 */

import AuthService from "@services/authService.js";
import { RegisterUserRequest, LoginUserRequest } from "models/userModel";
import { Context } from "elysia";
import { ZodIssue } from "zod";

export default class AuthController {

  // Register Controller
  static async register(context: Context): Promise<{ message: string, user: object | null } | ZodIssue[] | undefined | Response> {
    const payload: RegisterUserRequest = (context.body as RegisterUserRequest);
    const response = await AuthService.register(payload);
    
    return response;
  }

  // Login Controller
  static async login(context: Context): Promise<{ message?: string, token: string | null } | ZodIssue[] | undefined | Response> {
    const payload: LoginUserRequest = (context.body as LoginUserRequest);
    const response = await AuthService.login(payload);

    return response;
  }

}