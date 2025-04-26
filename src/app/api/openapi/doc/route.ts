import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'
import { CORSPlugin } from '@orpc/server/plugins'
import { experimental_ValibotToJsonSchemaConverter as ValibotToJsonSchemaConverter } from '@orpc/valibot'
import { type NextRequest, NextResponse } from 'next/server'
import { router } from '~/lib/orpc-router'

export async function GET(req: NextRequest) {
  //? https://orpc.unnoq.com/docs/openapi/openapi-handler
  const openApiHandler = new OpenAPIHandler(router, {
    plugins: [
      new CORSPlugin(),
      // ? https://orpc.unnoq.com/docs/openapi/plugins/openapi-reference
      new OpenAPIReferencePlugin({
        // ? https://github.com/unnoq/orpc/tree/main/packages/valibot
        schemaConverters: [new ValibotToJsonSchemaConverter()],
        specGenerateOptions: {
          info: {
            title: 'My Dummy Todo API',
            version: '1.0.0',
          },
          // This is the prefix for the API
          servers: [{ url: '/rpc' }],
        },
      }),
    ],
  })

  const { matched, response } = await openApiHandler.handle(req, {
    prefix: '/api/openapi/doc',
  })

  if (matched) {
    return response
  }

  return NextResponse.json(
    {
      message: 'No matching route found',
    },
    {
      status: 404,
    },
  )
}
