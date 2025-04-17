import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { router } from '~/lib/orpc-router'

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
  // headers: { Authorization: 'Bearer token' },
})

export const client: RouterClient<typeof router> = createORPCClient(link)
