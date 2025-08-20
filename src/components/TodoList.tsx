import type { Todo } from '../types'

type Props = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  filter: 'all' | 'open' | 'done'
}

export default function TodoList({ todos, onToggle, onDelete, filter }: Props) {
  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  )

  return (
    <ul aria-label="todo-list">
      {filtered.map(t => (
        <li key={t.id}>
          <label>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)}
              aria-label={`toggle-${t.id}`}
            />
            {t.text}
          </label>
          <button aria-label={`delete-${t.id}`} onClick={() => onDelete(t.id)}>Ta bort</button>
        </li>
      ))}
    </ul>
  )
}