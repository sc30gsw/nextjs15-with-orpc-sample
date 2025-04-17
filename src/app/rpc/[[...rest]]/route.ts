import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'
import { router } from '~/lib/orpc-router'

const handler = new RPCHandler(router, {
  plugins: [new CORSPlugin()],
})

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, {
    prefix: '/rpc',
    context: {},
  })

  return response ?? new Response('Not found', { status: 404 })
}

export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
