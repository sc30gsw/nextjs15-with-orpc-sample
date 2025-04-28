import { up } from 'up-fetch'

export const fetcher = up(fetch, () => ({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/hono/api`,
}))
