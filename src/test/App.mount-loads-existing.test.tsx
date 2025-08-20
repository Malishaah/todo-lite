// src/test/App.mount-loads-existing.test.tsx
import { render, screen } from '@testing-library/react'
import App from '../App'
import { expect, test, vi } from 'vitest'


test('laddar befintliga todos vid mount (branch i App.tsx)', () => {
  // mocka localStorage innan render
  const store: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear: () => { for (const k in store) delete store[k] }
  })

  // lägg in två todos redan innan App mountar
  store['todos'] = JSON.stringify([
    { id: 'seed-1', text: 'Seed A', done: false },
    { id: 'seed-2', text: 'Seed B', done: true },
  ])

  render(<App />)

  // Verifiera att de faktiskt laddades och renderades
  expect(screen.getByText('Seed A')).toBeInTheDocument()
  expect(screen.getByText('Seed B')).toBeInTheDocument()

  vi.restoreAllMocks()
})
