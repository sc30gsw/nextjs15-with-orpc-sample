import z from 'zod'

export const TodoSchema = z.object({
  id: z.number({
    message: 'ID is required',
  }),
  todo: z.string().min(1, { message: 'Title is required' }),
  completed: z.boolean(),
  userId: z.number({
    message: 'User ID is required',
  }),
})

export type Todo = z.infer<typeof TodoSchema>
