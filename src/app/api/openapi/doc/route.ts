import fs from 'node:fs'
import { OpenAPIGenerator } from '@orpc/openapi'
import { experimental_ValibotToJsonSchemaConverter as ValibotToJsonSchemaConverter } from '@orpc/valibot'
import { NextResponse } from 'next/server'
import { router } from '~/lib/orpc-router'

// ? https://github.com/unnoq/orpc/tree/main/packages/valibot
export async function GET() {
  const generator = new OpenAPIGenerator({
    schemaConverters: [new ValibotToJsonSchemaConverter()],
  })

  const spec = await generator.generate(router, {
    info: {
      title: 'My Dummy Todo API',
      version: '1.0.0',
    },
  })

  fs.writeFileSync('openapi.json', JSON.stringify(spec, null, 2), 'utf8')

  return NextResponse.json(spec, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
