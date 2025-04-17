import { unstable_cacheTag as cacheTag } from 'next/cache'
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
