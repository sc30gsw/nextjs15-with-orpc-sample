import { os } from '@orpc/server'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as v from 'valibot'
import {
  type Todo,
  TodoSchema,
} from '~/features/todo/types/schemas/todo-schema'

import { upfetch } from '~/lib/up-fetch'

// ? https://dummyjson.com/docs/todos#todos-all
export const listTodo = os
  .route({ method: 'GET' })
  .input(
    v.object({
      limit: v.pipe(v.number(), v.minValue(1), v.maxValue(100)),
      skip: v.pipe(v.number(), v.minValue(0)),
    }),
  )
  .output(
    v.object({
      todos: v.array(TodoSchema),
      total: v.number(),
      skip: v.number(),
      limit: v.number(),
    }),
  )
  .handler(async ({ input }) => {
    type Response = {
      todos: Todo[]
      total: number
      skip: number
      limit: number
    }

    const response = await upfetch<Response>('/todos', {
      params: input,
    })

    return response
  })

// ? https://dummyjson.com/docs/todos#todos-single
export const findTodo = os
  .route({ method: 'GET' })
  .input(v.pick(TodoSchema, ['id']))
  .output(TodoSchema)
  .handler(async ({ input }) => {
    const response = await upfetch<Todo>(`/todos/${input.id}`)

    return response
  })
