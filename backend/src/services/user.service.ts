/**
 * Service Untuk Memanipulasi Data User
 */

import prismaClient from "@databases/prisma.client.js";
import HttpException from "@lib/httpException.js";
import { Prisma } from "@prisma/client";
import { UpdateUserRequest } from "@models/user.model.js";
import { UserValidation } from "@validations/user.validation.js";
import { ZodError } from "zod";
import { ResponseModel } from "@models/response.model.js";
import Response from "@lib/response.js";
import type { CreateCommentRequest } from "@models/comment.model.js";
import { CommentValidation } from "@validations/comment.validation.js";

export default class UserService {

  // Mendapatkan User berdasarkan id
  static async getUser(userId: string, isStatistics: boolean = false, username: string | null = null, online: boolean = false): Promise<ResponseModel<any>> {
    let user;

    if (isStatistics) {
      user = await prismaClient.user.findUnique({
        where: { id: userId },
        select: {
          anime: true,
          manga: true,
        },
      });
    } else if (online) {
      user = await prismaClient.user.findUnique({
        where: { id: userId },
        select: {
          lastSeen: true,
        },
      });
    } else if (username) {
      user = await prismaClient.user.findFirst({
        where: { username: username },
        select: {
          id: true,
          username: true,
          name: true,
          anime: true,
          manga: true,
          avatar: true,
          banner: true,
          email: true,
          pronoun: true,
          role: true,
          isVerify: true,
          lastSeen: true,
          bio: true,
          badges: true,
          created_at: true,
          updated_at: true,
        },
      });
    } else {
      user = await prismaClient.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          name: true,
          anime: true,
          manga: true,
          avatar: true,
          banner: true,
          email: true,
          pronoun: true,
          lastSeen: true,
          role: true,
          isVerify: true,
          bio: true,
          badges: true,
          created_at: true,
          updated_at: true,
        },
      });
    }

    if (!user) {
      return HttpException.standarException(404, { message: "User not found" });
    }

    return Response.standarResponse(200, user);
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
        return HttpException.standarException(404, { message: "User not found" });
      }

      const updatedUser = await prismaClient.user.update({
        where: { id: userId },
        data: {
          username: data.username ?? undefined,
          name: data.name ?? undefined,
          avatar: data.avatar ?? undefined,
          bio: data.bio ?? undefined,
          pronoun: data.pronoun ?? undefined,
          badges: data.badges ?? undefined,
          banner: data.banner ?? undefined
        },
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          email: true,
          banner: true,
          bio: true,
          pronoun: true,
          isVerify: true,
          badges: true,
        },
      }).catch(error => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code == "P2002") {
            return HttpException.standarException(400, { message: "Username sudah digunakan!" })
          }
        }
      });

      return Response.standarResponse(200, updatedUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(500, { message: "Error" })
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
          banner: true,
          role: true,
          bio: true,
          isVerify: true,
          badges: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        return HttpException.standarException(404, { message: "User not found" });
      }

      return Response.standarResponse(200, user);
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpException.standarException(400, error.issues)
      } else {
        return HttpException.standarException(500, { message: "Error" })
      }
    }
  }

  // // Total Menonton
  // static async updateWatch(userId: string, isAnime: boolean = false, isManga: boolean = false) {
  //   const user = prismaClient.user.findUnique({
  //     where: { id: userId },
  //     select: {
  //       id: true,
  //     }
  //   });

  //   if (!user) {
  //     return new Response(
  //       JSON.stringify({ message: 'User not found!' }),
  //       { status: 404, headers: { 'Content-Type': 'application/json' } }
  //     )
  //   }

  //   const userUpdated = prismaClient.user.update({
  //     where: {
  //       id: userId
  //     },
  //     data: {
  //       ...(isAnime ? { anime_read: { increment: 1 } } : {}),
  //       ...(isManga ? { manga_read: { increment: 1 } } : {}),
  //     },
  //   });

  //   return userUpdated;
  // }

  // // Mendapatkan Data Semua User
  // static async getAllUser() {
  //   const users = await prismaClient.user.findMany({
  //     select: {
  //       id: true,
  //       username: true,
  //       name: true,
  //       avatar: true,
  //       banner: true,
  //       role: true,
  //       anime_read: true,
  //       manga_read: true,
  //       created_at: true,
  //       updated_at: true,
  //     },
  //   });

  //   if (users.length === 0) {
  //     return new Response(
  //       JSON.stringify({ message: 'User not found!' }),
  //       { status: 404, headers: { 'Content-Type': 'application/json' } }
  //     )
  //   }

  //   return users;
  // }

  // static async replyComment(userId: string, request: ReplyCommentRequest) {
  //   request = CommentValidation.REPLY_COMMENT.parse(request);
  //   const comment = await prismaClient.comment.findUnique({
  //     where: { id: request.comment_id },
  //   });

  //   if (!comment) {
  //     return HttpException.standarException(404, { message: "Comment not found" });
  //   }

  //   const reply = await prismaClient.replyComment.create({
  //     data: {
  //       userId,
  //       content: request.content,
  //       commentId: request.comment_id,
  //       created_at: new Date(),
  //     },
  //     select: {
  //       id: true,
  //       content: true,
  //       created_at: true,
  //     },
  //   });

  //   return reply;
  // }

  // static async deleteReplyComment(userId: string, replyId: string) {
  //   const reply = await prismaClient.replyComment.findUnique({
  //     where: { id: replyId, userId },
  //   });

  //   if (!reply) {
  //     return HttpException.standarException(404, { message: "Reply not found" });
  //   }

  //   await prismaClient.replyComment.delete({
  //     where: {
  //       id: replyId,
  //     },
  //   });

  //   return { message: "Reply deleted" };
  // }

  static async getComment(animeId: string) {
    const commentCount = await prismaClient.comment.count({
      where: { anime_id: animeId },
    });

    if (commentCount === 0) {
      return Response.standarResponse(200, []);
    }

    const comments = await prismaClient.comment.findMany({
      where: {
        anime_id: animeId,
      },
      select: {
        id: true,
        content: true,
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            banner: true,
            role: true,
            bio: true,
            isVerify: true,
            badges: true,
            created_at: true,
            updated_at: true,
          },
        },
        // replies: {
        //   select: {
        //     id: true,
        //     content: true,
        //     created_at: true,
        //     user: {
        //       select: {
        //         id: true,
        //         username: true,
        //         avatar: true,
        //         badges: true,
        //         isVerify: true,
        //         name: true,
        //         banner: true,
        //         bio: true,
        //         role: true,
        //         created_at: true,
        //         updated_at: true,
        //       },
        //     },
        //   },
        // },
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return Response.standarResponse(200, comments);
  }

  static async postComment(
    animeId: string,
    userId: string,
    request: CreateCommentRequest,
  ) {
    request = CommentValidation.CREATE_COMMENT.parse(request);

    const comment = await prismaClient.comment.create({
      data: {
        anime_id: animeId,
        user_id: userId,
        content: request.content,
        created_at: new Date(),
      },
      select: {
        id: true,
        content: true,
        created_at: true,
      },
    });

    return Response.standarResponse(201, comment);
  }

  static async deleteComment(userId: string, commentId: string) {
    const comment = await prismaClient.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return HttpException.standarException(404, "Comment not found");
    }

    await prismaClient.comment.delete({
      where: {
        id: commentId,
      },
    });

    return Response.standarResponse(200, "Comment deleted");
  }

  static async increaseWatchStatistics(anime: Record<string, any>, manga: Record<string, any>) {
    const response: Record<string, any> = {};

    if (Object.keys(anime).length === 0 && Object.keys(manga).length === 0) {
      return HttpException.standarException(400, { message: "Anime or Manga data is required" });
    }

    if (Object.keys(anime).length > 0) {
      const isExist = await prismaClient.user.findUnique({
        where: { id: anime.user_id, anime: { some: { anime_id: anime.anime_id } } },
        select: { id: true }
      });

      if (!isExist) {
        response["anime"] = await prismaClient.anime.create({
          data: {
            anime_id: anime.anime_id as string,
            user_id: anime.user_id || "",
            created_at: new Date(),
          }
        })
      }
    }

    if (Object.keys(manga).length > 0) {
      const isExist = await prismaClient.user.findUnique({
        where: { id: manga.user_id, manga: { some: { manga_id: manga.manga_id } } },
        select: { id: true }
      });

      if (!isExist) {
        response["manga"] = await prismaClient.manga.create({
          data: {
            manga_id: manga.manga_id as string,
            user_id: manga.user_id || "",
            created_at: new Date(),
          }
        })
      }
    }

    return Response.standarResponse(200, response);
  }

}