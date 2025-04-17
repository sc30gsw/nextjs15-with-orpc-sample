'use server'

import { os } from '@orpc/server'
import { revalidateTag } from 'next/cache'
import z from 'zod'
import {
  type Todo,
  TodoSchema,
} from '~/features/todo/types/schemas/todo-schema'
import { upfetch } from '~/lib/up-fetch'

// ? https://dummyjson.com/docs/todos#todos-add
export const addTodoAction = os
  .input(TodoSchema.omit({ id: true }))
  .output(TodoSchema)
  .errors({
    ADD_TODO_ERROR: {
      message: 'Error adding todo',
      data: z.object({ error: z.string() }),
    },
  })
  .handler(async ({ input }) => {
    const response = await upfetch<Todo>('/todos/add', {
      method: 'POST',
      body: input,
    })

    revalidateTag('getTodos')

    return response
  })
  .actionable()
