/**
 * Middleware Untuk Route Yang Membutuhkan Token Ketika Request
 */

import prismaClient from '@databases/prisma.client.js'
import { Context } from 'elysia'
import { EXCEPT_AUTH_ROUTE } from '@config/app.js'

export const authMiddleware = async ({ headers, store, path, request }: Context) => {
  const token = headers['x-token']

  const isExcept = EXCEPT_AUTH_ROUTE.some(([url, method]) => {
    if (path.replace('/api/v1', '') == url && request.method === method) {
      return true;
    } else {
      return false;
    }
  })
  
  if (!token && !isExcept) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const user = await prismaClient.user.findFirst({
    where: { token }
  })

  if (!user && !isExcept) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  (store as { token: string, userId: string }).token = token || "";
  (store as { token: string, userId: string }).userId = user?.id || "";
}