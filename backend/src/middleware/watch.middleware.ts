/**
 * Middleware Penambah Total Nonton Manga & Anime
 */

import prismaClient from "@databases/prisma.client.js"
import { customCache } from "@lib/cache.js"
import UserService from "@services/user.service.js";

export const watchMiddleware = async ({ headers, path }: any) => {
  const token = headers['x-token']

  let user: any;

  if (!customCache.get(token)) {
    user = await prismaClient.user.findFirst({
      where: { token }
    })
    customCache.set(token, user as any);
  } else {
    user = customCache.get(token);
  }

  if (user) {
    // updateWatch(user.id, (path as string).includes("/api/v1/anime"), (path as string).includes("/api/v1/manga"));
  }
}