import { z } from '@hono/zod-openapi'

export const TodoListQuerySchema = z.object({
  limit: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().min(1).max(100))
    .openapi({
      param: {
        name: 'limit',
        in: 'query',
      },
      example: '100',
    }),
  skip: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().min(0))
    .openapi({
      param: {
        name: 'skip',
        in: 'query',
      },
      example: '0',
    }),
})

export const TodoQuerySchema = z.object({
  id: z
    .string()
    .min(1, 'id is required')
    .openapi({
      param: {
        name: 'id',
        in: 'query',
      },
      example: '1',
    }),
})

export const TodoSchema = z.object({
  id: z.number(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number(),
})

export type Todo = z.infer<typeof TodoSchema>

export const TodoListResponseSchema = z
  .object({
    todos: z.array(TodoSchema).openapi({
      example: [
        {
          id: 1,
          todo: 'Todo 1',
          completed: false,
          userId: 1,
        },
        {
          id: 2,
          todo: 'Todo 2',
          completed: true,
          userId: 2,
        },
      ],
    }),
    total: z.number().openapi({
      example: 100,
    }),
    skip: z.number().openapi({
      example: 0,
    }),
    limit: z.number().openapi({
      example: 10,
    }),
  })
  .openapi('Todos')

export const TodoResponseSchema = z
  .object({
    todo: TodoSchema.openapi({
      example: {
        id: 1,
        todo: 'Todo 1',
        completed: false,
        userId: 1,
      },
    }),
  })
  .openapi('Todo')
