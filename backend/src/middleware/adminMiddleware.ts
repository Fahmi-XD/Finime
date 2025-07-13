/**
 * Middleware Route Khusus Admin
 */

import prismaClient from '@databases/prismaClient.js'
import { Context } from 'elysia'

export const adminMiddleware = async ({ headers, store }: Context) => {
  const token = headers['x-token']

  if (!token) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const user = await prismaClient.user.findFirst({
    where: { token }
  })

  if (!user || user.role !== "ADMIN") {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  (store as { token: string, userId: string }).token = token;
  (store as { token: string, userId: string }).userId = user.id;
}