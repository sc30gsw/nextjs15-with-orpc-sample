import type { InferResponseType } from 'hono'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { fetcher } from '~/lib/fetcher'
import { client as honoClient } from '~/lib/hono-rpc'
import { client } from '~/lib/orpc-client'

export const getTodos = async (
  params?: Parameters<typeof client.todos.list>[0],
) => {
  'use cache'
  cacheTag('getTodos')

  const res = await client.todos.list({
    limit: params?.limit ?? 100,
    skip: params?.skip ?? 0,
  })

  return res
}

export const getTodo = async ({
  id,
}: Parameters<typeof client.todos.find>[0]) => {
  'use cache'
  cacheTag(`getTodo/${id}`)

  const res = await client.todos.find({ id })

  return res
}

export const getTodosByHono = async (params?: {
  limit?: string
  skip?: string
}) => {
  'use cache'
  cacheTag('getTodosByHoo')

  const url = honoClient.hono.api.todos.list.$url({
    query: {
      limit: params?.limit ?? '100',
      skip: params?.skip ?? '0',
    },
  })
  type Res = InferResponseType<typeof honoClient.hono.api.todos.list.$get, 200>

  const res = await fetcher<Res>(url)

  return res
}

export const getTodoByHono = async (id: string) => {
  'use cache'
  cacheTag(`getTodoByHono/${id}`)

  const url = honoClient.hono.api.todos.find.$url({
    query: {
      id,
    },
  })
  type Res = InferResponseType<typeof honoClient.hono.api.todos.find.$get, 200>

  const res = await fetcher<Res>(url)

  return res
}
