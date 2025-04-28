import { createRoute } from '@hono/zod-openapi'
import { ErrorResponse } from '~/features/todo/types/schemas/hono-error-schema'
import {
  TodoListQuerySchema,
  TodoListResponseSchema,
  TodoQuerySchema,
  TodoResponseSchema,
} from '~/features/todo/types/schemas/hono-todo-schema'

export const getTodoListRoute = createRoute({
  method: 'get',
  path: '/list',
  request: {
    query: TodoListQuerySchema,
  },
  description: 'Get todos list',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: TodoListResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
  },
})

export const getTodoRoute = createRoute({
  method: 'get',
  path: '/find',
  request: {
    query: TodoQuerySchema,
  },
  description: 'Get todos list',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: TodoResponseSchema,
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
  },
})
