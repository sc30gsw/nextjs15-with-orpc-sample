import { handle } from 'hono/vercel'
import openApiApp, { type route } from '~/features/todo/server/hono'

export const runtime = 'edge'

export type AppType = typeof route

export const GET = handle(openApiApp)
export const POST = handle(openApiApp)
