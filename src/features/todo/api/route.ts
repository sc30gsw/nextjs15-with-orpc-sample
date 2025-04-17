import { os } from '@orpc/server'
import { z } from 'zod'
import {
  type Todo,
  TodoSchema,
} from '~/features/todo/types/schemas/todo-schema'
import { upfetch } from '~/lib/up-fetch'

// ? https://dummyjson.com/docs/todos#todos-all
export const listTodo = os
  .route({ method: 'GET' })
  .input(
    z.object({
      limit: z.number().min(1).max(100).optional(),
      skip: z.number().min(0).optional(),
    }),
  )
  .output(
    z.object({
      todos: z.array(TodoSchema),
      total: z.number(),
      skip: z.number(),
      limit: z.number(),
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
  .input(TodoSchema.pick({ id: true }))
  .output(TodoSchema)
  .handler(async ({ input }) => {
    const response = await upfetch<Todo>(`/todos/${input.id}`)

    return response
  })
