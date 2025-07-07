import Elysia from 'elysia'

const app = new Elysia({  prefix: '/api'}).get('/', () => {
  return { message: "Hello Elysia! You've deployed Elysia to Vercel" }
})

export const GET = app.handle 
export const POST = app.handle 
export const PATCH = app.handle 
export const PUT = app.handle 
export const OPTIONS = app.handle 