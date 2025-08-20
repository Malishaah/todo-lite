import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import {  expect, test } from 'vitest'


test('alla filter-knappar sätter aria-pressed true/false (branch coverage)', async () => {
  const user = userEvent.setup()
  render(<App />)

  const btnAlla = screen.getByRole('button', { name: 'Alla' })
  const btnOppna = screen.getByRole('button', { name: 'Öppna' })
  const btnKlart = screen.getByRole('button', { name: 'Klart' })

  // Startläge: 'Alla' är aktiv
  expect(btnAlla).toHaveAttribute('aria-pressed', 'true')
  expect(btnOppna).toHaveAttribute('aria-pressed', 'false')
  expect(btnKlart).toHaveAttribute('aria-pressed', 'false')

  // Växla till Öppna
  await user.click(btnOppna)
  expect(btnAlla).toHaveAttribute('aria-pressed', 'false')
  expect(btnOppna).toHaveAttribute('aria-pressed', 'true')
  expect(btnKlart).toHaveAttribute('aria-pressed', 'false')

  // Växla till Klart
  await user.click(btnKlart)
  expect(btnAlla).toHaveAttribute('aria-pressed', 'false')
  expect(btnOppna).toHaveAttribute('aria-pressed', 'false')
  expect(btnKlart).toHaveAttribute('aria-pressed', 'true')

  // Tillbaka till Alla (så varje uttryck fått både true och false)
  await user.click(btnAlla)
  expect(btnAlla).toHaveAttribute('aria-pressed', 'true')
  expect(btnOppna).toHaveAttribute('aria-pressed', 'false')
  expect(btnKlart).toHaveAttribute('aria-pressed', 'false')
})
