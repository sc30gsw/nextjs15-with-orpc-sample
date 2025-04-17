import { Suspense } from 'react'
import { getTodo } from '~/features/todo/server/fetcher'

export default async function TodoIdPage({
  params,
}: {
  params: Promise<{ todoId: string }>
}) {
  const { todoId } = await params

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        {getTodo({ id: Number(todoId) }).then((todo) => (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{todo.todo}</h2>
            <p className={todo.completed ? 'text-green-500' : 'text-red-500'}>
              {todo.completed ? 'Completed' : 'Not completed'}
            </p>
          </div>
        ))}
      </Suspense>
    </div>
  )
}
