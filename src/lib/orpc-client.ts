import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { router } from '~/lib/orpc-router'

const link = new RPCLink({
  url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/rpc`,
  // headers: { Authorization: 'Bearer token' },
})

export const client: RouterClient<typeof router> = createORPCClient(link)
