import '@testing-library/jest-dom/vitest'  // <-- auto-extend: expect får matchers
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
