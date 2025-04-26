import { OpenAPIGenerator } from '@orpc/openapi'
import { experimental_ValibotToJsonSchemaConverter as ValibotToJsonSchemaConverter } from '@orpc/valibot'
import { NextResponse } from 'next/server'
import { router } from '~/lib/orpc-router'

export async function GET() {
  const generator = new OpenAPIGenerator({
    schemaConverters: [new ValibotToJsonSchemaConverter()],
  })

  const spec = await generator.generate(router, {
    info: {
      title: 'My Dummy Todo API',
      version: '1.0.0',
    },
    // This is the prefix for the API
    servers: [{ url: '/rpc' }],
  })

  return NextResponse.json(spec, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
