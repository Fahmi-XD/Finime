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

export default class AuthService {

  // Register
  static async register(request: RegisterUserRequest): Promise<{ message: string; user: object | null } | ZodIssue[] | undefined | Response> {
    try {
      request = AuthValidation.REGISTER.parse(request);

      const usernameExists = await prismaClient.user.count({
        where: { username: request.username },
      });

      if (usernameExists > 0) {
        return HttpException.standarException(400, { message: "Username already exists" })
      }

      const existingContact = await prismaClient.contact.findUnique({
        where: { email: request.email },
      });

      if (existingContact) {
        return HttpException.standarException(400, { message: "Email already exists" })
      }

      request.password = await bcrypt.hash(request.password, 10);
      const first_name = request.first_name as string;
      const last_name = request.last_name as string;
      const name = first_name + " " + last_name;
      const user = await prismaClient.user.create({
        data: {
          username: request.username,
          password: request.password,
          name: name,
          role: "MEMBER",
          isVerify: false,
          badge: [],
          contact: {
            create: {
              email: request.email,
              first_name: first_name,
              last_name: last_name,
            },
          },
          metadata: {
            create: {
              mangaRead: 0,
              AnimeRead: 0
            }
          },
          created_at: new Date(),
        },
        select: {
          id: true,
          username: true,
          name: true,
          isVerify: true,
          badge: true,
          bio: true,
          contact: {
            select: {
              email: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      });

      return {
        message: "Register success",
        user,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(500, { message: "Error" })
      }
    }
  }

  // Login
  static async login(request: LoginUserRequest): Promise<{ token: string, message?: string } | ZodIssue[] | undefined | Response> {
    try {
      request = AuthValidation.LOGIN.parse(request);

      const user = await prismaClient.user.findUnique({
        where: { username: request.username },
      });

      if (!user) {
        return HttpException.standarException(400, { message: "Username or password is wrong" })
      }

      const isPasswordValid = await bcrypt.compare(
        request.password,
        user.password,
      );

      if (!isPasswordValid) {
        return HttpException.standarException(400, { message: "Username or password is wrong" })
      }

      const token = crypto.randomUUID();
      await prismaClient.user.update({
        where: { username: request.username },
        data: { token },
      });

      return { token };
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(500, { message: "Error" })
      }
    }
  }

}