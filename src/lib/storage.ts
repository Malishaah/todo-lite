import type { Todo } from '../types'

const KEY = 'todos'

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTodos(todos: Todo[]) {
  localStorage.setItem(KEY, JSON.stringify(todos))
}