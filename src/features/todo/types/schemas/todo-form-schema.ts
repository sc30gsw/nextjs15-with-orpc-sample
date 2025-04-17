import * as v from 'valibot'

export const TodoFormSchema = v.object({
  todo: v.pipe(
    v.string(),
    v.minLength(1, 'You must have a length of at least 1'),
  ),
  completed: v.optional(v.boolean(), false),
  userId: v.number('User ID must be a number'),
})

export const TodoInputSchema = v.pick(TodoFormSchema, ['todo'])
