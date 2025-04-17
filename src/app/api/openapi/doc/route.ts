import fs from 'node:fs'
import { OpenAPIGenerator } from '@orpc/openapi'
import { ZodToJsonSchemaConverter } from '@orpc/zod'
import { NextResponse } from 'next/server'
import { router } from '~/lib/orpc-router'

export async function GET() {
  const generator = new OpenAPIGenerator({
    schemaConverters: [new ZodToJsonSchemaConverter()],
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
