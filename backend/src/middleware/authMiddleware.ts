/**
 * Middleware Untuk Route Yang Membutuhkan Token Ketika Request
 */

import prismaClient from '@databases/prismaClient.js'

export const authMiddleware = async ({ headers, store, set }: any) => {
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

  if (!user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  (store as { token: string, userId: string }).token = token;
  (store as { token: string, userId: string }).userId = user.id;
}