import Elysia from 'elysia'
import { helmet } from 'elysia-helmet'
import { Pomf } from "@zanixongroup/uploader";

const app = new Elysia({  prefix: '/api'}).use(helmet()).get('/', () => {
  return { message: "Hello Elysia! You've deployed Elysia to Vercel" }
})

export const GET = app.handle 
export const POST = app.handle 
export const PATCH = app.handle 
export const PUT = app.handle 
export const OPTIONS = app.handle 