import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { expect, test, vi } from 'vitest'

test('toggle: matchande id flippar, icke-matchande lämnas oförändrat', async () => {
  const user = userEvent.setup()

  // mocka localStorage (isolerat)
  const store: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear: () => { for (const k in store) delete store[k] }
  })

  render(<App />)

  // Mocka två riktiga UUID:er (typ-säkert) – MÅSTE göras före varje add()
  const uuidSpy = vi.spyOn(crypto, 'randomUUID')
  uuidSpy
    .mockReturnValueOnce('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') // id för "A"
    .mockReturnValueOnce('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') // id för "B"

  // skapa två todos
  await user.type(screen.getByLabelText('todo-input'), 'A')
  await user.keyboard('{Enter}')
  await user.type(screen.getByLabelText('todo-input'), 'B')
  await user.keyboard('{Enter}')

  // båda startar okryssade
  const toggleA = screen.getByLabelText('toggle-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') as HTMLInputElement
  const toggleB = screen.getByLabelText('toggle-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') as HTMLInputElement
  expect(toggleA.checked).toBe(false)
  expect(toggleB.checked).toBe(false)

  // toggla bara A (träffar både true/false-grenar i map)
  await user.click(toggleA)
  expect((screen.getByLabelText('toggle-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') as HTMLInputElement).checked).toBe(true)
  expect((screen.getByLabelText('toggle-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') as HTMLInputElement).checked).toBe(false)

  vi.restoreAllMocks()
})
