/**
 * Service Untuk Memanipulasi Data Autentikasi
 */

import AuthValidation from "@validations/authValidation.js";
import prismaClient from "@databases/prismaClient.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";

import type { LoginUserRequest, RegisterUserRequest } from "@models/userModel.js";
import { ZodError, ZodIssue } from "zod";
import HttpException from "@lib/httpException.js";
import { ResponseModel } from "@models/responseModel.js";
import Response from "@lib/response.js";

export default class AuthService {

  // Register
  static async register(request: RegisterUserRequest): Promise<ResponseModel<{ message: string; user: object | null } | ZodIssue[]>> {
    try {
      const result = AuthValidation.REGISTER.safeParse(request);
      if (!result.success) {
        return HttpException.standarException(400, result.error.issues)
      }

      const usernameExists = await prismaClient.user.count({
        where: { username: request.username },
      });

      if (usernameExists > 0) {
        return HttpException.standarException(400, { message: "Username already exists", user: null })
      }

      const existingContact = await prismaClient.user.findUnique({
        where: { email: request.email },
      });

      if (existingContact) {
        return HttpException.standarException(400, { message: "Email already exists", user: null })
      }

      request.password = await bcrypt.hash(request.password, 10);
      const user = await prismaClient.user.create({
        data: {
          username: request.username,
          name: request.name,
          password: request.password,
          role: "MEMBER",
          isVerify: false,
          badges: [],
          email: request.email,
          created_at: new Date(),
        },
        select: {
          id: true,
          username: true,
          name: true,
          isVerify: true,
          badges: true,
          bio: true,
          email: true,
        },
      });

      return Response.standarResponse(200, {
        message: "Register success",
        user,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(500, { message: "Error", user: null })
      }
    }
  }

  // Login
  static async login(request: LoginUserRequest): Promise<ResponseModel<{ token: string, message?: string } | ZodIssue[]>> {
    try {
      const result = AuthValidation.LOGIN.safeParse(request);
      if (!result.success) {
        return HttpException.standarException(400, result.error.issues)
      }

      const user = await prismaClient.user.findUnique({
        where: { username: request.username },
      });

      if (!user) {
        return HttpException.standarException(400, { message: "Username or password is wrong", token: "" })
      }

      const isPasswordValid = await bcrypt.compare(
        request.password,
        user.password,
      );

      if (!isPasswordValid) {
        return HttpException.standarException(400, { message: "Username or password is wrong", token: "" })
      }

      const token = crypto.randomUUID();
      await prismaClient.user.update({
        where: { username: request.username },
        data: { token },
      });

      return Response.standarResponse(200, { token });
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(500, { message: "Error", token: "" })
      }
    }
  }

}