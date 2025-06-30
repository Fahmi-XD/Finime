/**
 * Service Untuk Memanipulasi Data User
 */

import prismaClient from "@databases/prismaClient";
import HttpException from "@lib/httpException";
import { Prisma } from "@prisma/client";
import { UpdateUserRequest } from "@typing/userType";
import { UserValidation } from "@validations/userValidation";
import { ZodError } from "zod";

export default class UserService {

  // Mendapatkan User berdasarkan id
  static async getUser(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        role: true,
        isVerify: true,
        bio: true,
        badge: true,
        contact: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        metadata: {
          select: {
            AnimeRead: true,
            mangaRead: true
          }
        },
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found!' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return user;
  }

  // Mengupdate User Profile
  static async updateUser(userId: string, data: UpdateUserRequest) {
    try {
      data = UserValidation.UPDATE_USER.parse(data);

      const userExists = await prismaClient.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!userExists) {
        return new Response(
          JSON.stringify({ message: 'User not found!' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        )
      }

      const contactData =
        data.email || data.first_name || data.last_name
          ? {
            upsert: {
              create: {
                email: data.email ?? "",
                first_name: data.first_name ?? "",
                last_name: data.last_name ?? "",
              },
              update: {
                email: data.email ?? undefined,
                first_name: data.first_name ?? undefined,
                last_name: data.last_name ?? undefined,
              },
            },
          }
          : undefined;

      const updatedUser = await prismaClient.user.update({
        where: { id: userId },
        data: {
          username: data.username ?? undefined,
          name: data.name ?? undefined,
          avatar: data.avatar ?? undefined,
          contact: contactData,
          bio: data.bio ?? undefined,
          badge: data.badge ?? undefined
        },
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          bio: true,
          isVerify: true,
          badge: true,
          contact: {
            select: {
              email: true,
              first_name: true,
              last_name: true,
            },
          },
          metadata: true
        },
      }).catch(error => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code == "P2002") {
            return HttpException.standarException(400, { message: "Username sudah digunakan!" })
          }
        }
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(400, { message: (error as any).message })
      }
    }
  }

  // Mendapatkan Profile User
  static async getUserProfile(username: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          role: true,
          bio: true,
          isVerify: true,
          badge: true,
          contact: {
            select: {
              email: true,
              first_name: true,
              last_name: true,
            },
          },
          metadata: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        return HttpException.standarException(404, { message: "User not found" });
      }

      return user;
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(400, { message: (error as any).message })
      }
    }
  }

  // Total Menonton
  static async updateWatch(userId: string, isAnime: boolean = false, isManga: boolean = false) {
    const user = prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        metadataId: true,
        metadata: {
          select: {
            AnimeRead: true,
            mangaRead: true
          }
        }
      }
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found!' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const userUpdated = prismaClient.user.update({
      where: {
        id: userId
      },
      data: {
        metadata: {
          update: {
            ...(isAnime ? { AnimeRead: { increment: 1 } } : {}),
            ...(isManga ? { mangaRead: { increment: 1 } } : {}),
          }
        }
      },
      include: {
        metadata: true
      }
    });

    return userUpdated;
  }

  // Mendapatkan Data Semua User
  static async getAllUser() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        role: true,
        contact: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        metadata: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ message: 'User not found!' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return users;
  }

}