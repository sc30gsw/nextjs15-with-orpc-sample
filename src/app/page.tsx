import Link from 'next/link'
import { Suspense } from 'react'
import { TodoForm } from '~/features/todo/components/todo-form'
import { getTodos } from '~/features/todo/server/fetcher'

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <TodoForm />
      <Suspense fallback={<div>Loading...</div>}>
        {getTodos().then(({ todos }) => {
          return todos.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Link href={`/todo/${item.id}`}>{item.todo}</Link>
              <p className={item.completed ? 'text-green-500' : 'text-red-500'}>
                {item.completed ? 'Completed' : 'Not completed'}
              </p>
            </div>
          ))
        })}
      </Suspense>
    </div>
  )
}
