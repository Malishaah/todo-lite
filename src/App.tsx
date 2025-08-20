import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import type { Todo } from './types'
import { loadTodos, saveTodos } from './lib/storage'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all'|'open'|'done'>('all')

  useEffect(() => { setTodos(loadTodos()) }, [])
  useEffect(() => { saveTodos(todos) }, [todos])

  function add(text: string) {
    setTodos(prev => [{ id: crypto.randomUUID(), text, done: false }, ...prev])
  }
  function toggle(id: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }
  function del(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div>
      <h1>Todo Lite</h1>
      <TodoForm onAdd={add} />
      <div role="group" aria-label="filter">
        <button onClick={() => setFilter('all')} aria-pressed={filter==='all'}>Alla</button>
        <button onClick={() => setFilter('open')} aria-pressed={filter==='open'}>Öppna</button>
        <button onClick={() => setFilter('done')} aria-pressed={filter==='done'}>Klart</button>
      </div>
      <TodoList todos={todos} onToggle={toggle} onDelete={del} filter={filter} />
    </div>
  )
}