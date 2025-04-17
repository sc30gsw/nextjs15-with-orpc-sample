import * as v from 'valibot'

export const TodoSchema = v.object({
  id: v.number(),
  todo: v.string(),
  completed: v.boolean(),
  userId: v.number(),
})

export type Todo = v.InferOutput<typeof TodoSchema>
