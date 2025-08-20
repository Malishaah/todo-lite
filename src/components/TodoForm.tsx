import { useState } from 'react'

type Props = { onAdd: (text: string) => void }

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return // enkel validering
    onAdd(trimmed)
    setText('')
  }

  return (
    <form onSubmit={submit} aria-label="todo-form">
      <input
        aria-label="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Lägg till en uppgift"
      />
      <button type="submit">Lägg till</button>
    </form>
  )
}