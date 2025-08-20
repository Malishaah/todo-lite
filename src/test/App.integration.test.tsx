import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
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
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('lägg till två, toggla en (map true/false), filtrera och radera den andra (filter true/false)', async () => {
  const user = userEvent.setup()
  render(<App />)

  // Mocka två olika, riktiga UUID:er
  const uuidSpy = vi.spyOn(crypto, 'randomUUID')
  uuidSpy
    .mockReturnValueOnce('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') // id för 'Diska'
    .mockReturnValueOnce('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') // id för 'Städa'

  // Lägg till två todos
  const form = screen.getByLabelText('todo-form')
  const input = within(form).getByLabelText('todo-input')

  await user.type(input, 'Diska')
  await user.keyboard('{Enter}')
  await user.type(input, 'Städa')
  await user.keyboard('{Enter}')

  expect(screen.getByText('Diska')).toBeInTheDocument()
  expect(screen.getByText('Städa')).toBeInTheDocument()

  // Toggle BARA 'Diska' → map-branch kör true (Diska) och false (Städa)
  const toggleDiska = screen.getByLabelText('toggle-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') as HTMLInputElement
  await user.click(toggleDiska)
  expect(toggleDiska.checked).toBe(true)

  // Filtrera "Klart" → visar bara Diska
  await user.click(screen.getByRole('button', { name: 'Klart' }))
  expect(screen.getByText('Diska')).toBeInTheDocument()
  expect(screen.queryByText('Städa')).not.toBeInTheDocument()

  // Filtrera "Öppna" → visar bara Städa
  await user.click(screen.getByRole('button', { name: 'Öppna' }))
  expect(screen.getByText('Städa')).toBeInTheDocument()
  expect(screen.queryByText('Diska')).not.toBeInTheDocument()

  // Tillbaka till "Alla"
  await user.click(screen.getByRole('button', { name: 'Alla' }))
  expect(screen.getByText('Diska')).toBeInTheDocument()
  expect(screen.getByText('Städa')).toBeInTheDocument()

  // Radera BARA 'Städa' → filter-branch kör true (Diska stannar) och false (Städa tas bort)
  await user.click(screen.getByLabelText('delete-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'))
  expect(screen.queryByText('Städa')).not.toBeInTheDocument()
  expect(screen.getByText('Diska')).toBeInTheDocument()
})
