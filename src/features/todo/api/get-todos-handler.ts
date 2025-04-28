import type { RouteHandler } from '@hono/zod-openapi'
import type {
  getTodoListRoute,
  getTodoRoute,
} from '~/features/todo/api/get-todos-route'
import type { Todo } from '~/features/todo/types/schemas/hono-todo-schema'
import { upfetch } from '~/lib/up-fetch'

export const getTodoListHandler: RouteHandler<typeof getTodoListRoute> = async (
  c,
) => {
  try {
    const query = c.req.query()
    type Response = {
      todos: Todo[]
      total: number
      skip: number
      limit: number
    }

    const response = await upfetch<Response>('/todos', {
      params: query,
    })

    return c.json(response, 200)
  } catch (e) {
    return c.json({ message: 'Internal Server Error', stackTrace: e }, 500)
  }
}

export const getTodoHandler: RouteHandler<typeof getTodoRoute> = async (c) => {
  try {
    const query = c.req.query()

    if (!query.id) {
      return c.json({ message: 'Todo ID is required' }, 400)
    }

    const response = await upfetch<Todo>(`/todos/${query.id}`, {
      params: query,
    })

    return c.json({ todo: response }, 200)
  } catch (e) {
    return c.json({ message: 'Internal Server Error', stackTrace: e }, 500)
  }
}
