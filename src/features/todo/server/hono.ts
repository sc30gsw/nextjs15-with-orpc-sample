import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import {
  getTodoHandler,
  getTodoListHandler,
} from '~/features/todo/api/get-todos-handler'
import {
  getTodoListRoute,
  getTodoRoute,
} from '~/features/todo/api/get-todos-route'

const todoApi = new OpenAPIHono()
  .openapi(getTodoListRoute, getTodoListHandler)
  .openapi(getTodoRoute, getTodoHandler)

const openApiApp = new OpenAPIHono().basePath('/hono/api')

export const route = openApiApp.route('/todos', todoApi)

openApiApp
  .doc('/specification', {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  })
  .get(
    '/doc',
    swaggerUI({
      url: '/hono/api/specification',
    }),
  )

export default openApiApp
