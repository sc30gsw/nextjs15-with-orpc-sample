'use client'

import { isDefinedError, onError, onSuccess } from '@orpc/client'
import { useServerAction } from '@orpc/react/hooks'
import { useForm } from '@tanstack/react-form'
import { addTodoAction } from '~/features/todo/actions/add-todo-action'
import { TodoInputSchema } from '~/features/todo/types/schemas/todo-form-schema'

export function TodoForm() {
  const f = useForm({
    defaultValues: {
      todo: '',
    },
    validators: {
      onChange: TodoInputSchema,
    },
  })

  const { execute, error, status } = useServerAction(addTodoAction, {
    interceptors: [
      onError((error) => {
        if (isDefinedError(error)) {
          alert(error.message)
        }
      }),
      onSuccess((data) => {
        alert(`Todo added successfully: ${data.todo} for user ${data.userId}`)
        f.reset()
      }),
    ],
  })

  const action = (form: FormData) => {
    f.handleSubmit()

    const todo = form.get('todo') as string

    execute({ todo, completed: false, userId: 1 })
  }

  return (
    <form className="flex gap-x-2 px-2 mb-5" action={action}>
      <f.Field
        name="todo"
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={(field) => {
          return (
            <div className="relative">
              <div className="flex flex-col gap-y-1">
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-white text-black p-1 rounded-md shadow-md w-full max-w-44"
                />
                {field.state.meta.errors.length > 0 && status !== 'success' ? (
                  <em className="text-red-500 absolute -bottom-6 w-64">
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(',')}
                  </em>
                ) : error?.message.includes('validation') ? (
                  <em className="text-red-500 absolute -bottom-6 w-64">
                    You must have a length of at least 1
                  </em>
                ) : null}
              </div>
            </div>
          )
        }}
      />

      <f.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || status === 'pending'}
            className="bg-blue-500 text-white p-1 rounded-md shadow-md hover:bg-blue-500/90 cursor-pointer transition-all duration-300 px-4 h-9 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || status === 'pending' ? 'Adding...' : 'Add'}
          </button>
        )}
      />
    </form>
  )
}
