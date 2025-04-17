'use server'

import { os } from '@orpc/server'
import { revalidateTag } from 'next/cache'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as v from 'valibot'
import { TodoFormSchema } from '~/features/todo/types/schemas/todo-form-schema'
import type { Todo } from '~/features/todo/types/schemas/todo-schema'
import { upfetch } from '~/lib/up-fetch'

// ? https://dummyjson.com/docs/todos#todos-add
export const addTodoAction = os
  .input(TodoFormSchema)
  .errors({
    ADD_TODO_ERROR: {
      message: 'Error adding todo',
      data: v.object({ error: v.string() }),
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
