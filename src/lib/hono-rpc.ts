import { hc } from 'hono/client'
import type { AppType } from '~/app/hono/[[...rest]]/route'

export const client = hc<AppType>(
  process.env.NEXT_PUBLIC_APP_BASE_URL ?? 'http://localhost:3000',
)
