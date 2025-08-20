import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach,beforeEach, expect, test, vi } from 'vitest'
import App from '../App'

beforeEach(() => {
  // Mocka localStorage
  const store: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear: () => { for (const k in store) delete store[k] }
  })
  // Stabilt id (mocka crypto UUID)
  vi.spyOn(crypto, 'randomUUID').mockReturnValue('fixed-id')
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('lägg till, toggla, filtrera och ta bort', async () => {
  const user = userEvent.setup()
  render(<App />)

  // Lägg till
  const form = screen.getByLabelText('todo-form')
  const input = within(form).getByLabelText('todo-input')
  await user.type(input, 'Diska')
  await user.keyboard('{Enter}')
  expect(screen.getByText('Diska')).toBeInTheDocument()

  // Toggle
  const checkbox = screen.getByLabelText('toggle-fixed-id')
  await user.click(checkbox)
  // Filtrera "Klart"
  await user.click(screen.getByRole('button', { name: 'Klart' }))
  expect(screen.getByText('Diska')).toBeInTheDocument()

  // Filtrera "Öppna" (ska vara tom)
  await user.click(screen.getByRole('button', { name: 'Öppna' }))
  expect(screen.queryByText('Diska')).not.toBeInTheDocument()

  // Ta bort (tillbaka till alla först)
  await user.click(screen.getByRole('button', { name: 'Alla' }))
  await user.click(screen.getByLabelText('delete-fixed-id'))
  expect(screen.queryByText('Diska')).not.toBeInTheDocument()
})
