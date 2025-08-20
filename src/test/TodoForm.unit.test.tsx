import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from '../components/TodoForm'
import {describe,beforeEach,afterEach,expect, test, vi } from 'vitest'
import { loadTodos, saveTodos } from '../lib/storage'

// Define the Todo type for testing purposes
type Todo = {
  id: string
  text: string
  done: boolean
}

test('lägger till giltig todo och rensar fältet', async () => {
  const user = userEvent.setup()
  const onAdd = vi.fn()
  render(<TodoForm onAdd={onAdd} />)

  const input = screen.getByLabelText('todo-input')
  await user.type(input, ' Handla mjölk ')
  await user.keyboard('{Enter}')

  expect(onAdd).toHaveBeenCalledWith('Handla mjölk')
  expect((input as HTMLInputElement).value).toBe('')
})

test('ignorerar tom/whitespace input', async () => {
  const user = userEvent.setup()
  const onAdd = vi.fn()
  render(<TodoForm onAdd={onAdd} />)

  const input = screen.getByLabelText('todo-input')
  await user.type(input, '   ')
  await user.keyboard('{Enter}')

  expect(onAdd).not.toHaveBeenCalled()
})


describe('storage', () => {
  beforeEach(() => {
    const store: Record<string, string> = {}
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v },
      removeItem: (k: string) => { delete store[k] },
      clear: () => { for (const k in store) delete store[k] }
    })
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returnerar [] när inget lagrat (raw falsy)', () => {
    // inget setItem → getItem = null
    expect(loadTodos()).toEqual([])
  })

  test('parsa giltig JSON när lagrat finns (raw truthy)', () => {
    const todos: Todo[] = [{ id: '1', text: 'A', done: false }]
    saveTodos(todos)
    expect(loadTodos()).toEqual(todos)
  })

  test('fångar fel (trasig JSON) och returnerar []', () => {
    // skriv in trasigt värde direkt
    localStorage.setItem('todos', '{nope:')
    expect(loadTodos()).toEqual([])
  })

  test('saveTodos serialiserar korrekt', () => {
    const todos: Todo[] = [{ id: '2', text: 'B', done: true }]
    saveTodos(todos)
    expect(localStorage.getItem('todos')).toBe(JSON.stringify(todos))
  })
})

