'use client'

import { isDefinedError, onError, onSuccess } from '@orpc/client'
import { useServerAction } from '@orpc/react/hooks'
import { addTodoAction } from '~/features/todo/actions/add-todo-action'

export function TodoForm() {
  const { execute, data, status } = useServerAction(addTodoAction, {
    interceptors: [
      onError((error) => {
        if (isDefinedError(error)) {
          alert(error.message)
        }
      }),
      onSuccess((data) => {
        alert(`Todo added successfully: ${data.todo} for user ${data.userId}`)
      }),
    ],
  })

  const action = (form: FormData) => {
    const todo = form.get('todo') as string
    execute({ todo, completed: false, userId: 1 })
  }

  return (
    <form className="flex gap-x-2 px-2" action={action}>
      <input
        type="text"
        name="todo"
        defaultValue={data?.todo}
        className="bg-white text-black p-1 rounded-md shadow-md"
      />
      <button
        type="submit"
        disabled={status === 'pending'}
        className="bg-blue-500 text-white p-1 rounded-md shadow-md hover:bg-blue-500/90 cursor-pointer transition-all duration-300 px-4"
      >
        {status === 'pending' ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
