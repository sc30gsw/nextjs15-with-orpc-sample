import { findTodo, listTodo } from '~/features/todo/api/route'

export const router = {
  todos: {
    list: listTodo,
    find: findTodo,
  },
}
