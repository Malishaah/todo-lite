import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from '../components/TodoForm'
import {expect, test, vi } from 'vitest'

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
