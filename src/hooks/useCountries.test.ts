import { renderHook, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, test, vi } from 'vitest'

import { useCountries } from './useCountries'
import { Country } from '../interfaces/countries.ts'

describe('useCountries Integration', () => {
  let apiResponse: Country[] = []
  let responseTime = 0


  beforeAll(async () => {
    const startTime = Date.now()
    const { result } = renderHook(() => useCountries())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    apiResponse = result.current.countries
    responseTime = Date.now() - startTime
  })

  test('API responds within 2 seconds', () => {
    expect(responseTime).toBeLessThan(2000)
  })


  test('fetches countries with correct data structure', () => {
    expect(Array.isArray(apiResponse)).toBe(true)
    const firstCountry = apiResponse[0]
    expect(firstCountry).toHaveProperty('name')
    expect(firstCountry).toHaveProperty('code')
  })
})

describe('useCountries error handling', () => {
  const errorCases = [
    {
      status: 404,
      expectedMessage: 'API endpoint not found'
    },
    {
      status: 429,
      expectedMessage: 'Too many requests - please try again later'
    },
    {
      status: 500,
      expectedMessage: 'Internal server error'
    },
    // generic error cases
    {
      status: 418, // 418 (I'm a teapot)
      expectedMessage: `HTTP error! status: 418`
    }
  ]

  errorCases.forEach(({ status, expectedMessage }) => {
    test(`handles ${String(status)} error correctly`, async () => {
      const mockFetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: status
      })
      vi.stubGlobal('fetch', mockFetch)

      const { result } = renderHook(() => useCountries())

      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBe(null)

      await waitFor(() => {
        expect(result.current.error?.message).toBe(expectedMessage)
      })

      expect(result.current.loading).toBe(false)
      expect(result.current.countries).toEqual([])

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'https://countries.trevorblades.com/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )
    })
  })
})

test('handles invalid JSON response', async () => {
  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.reject(new Error('Invalid JSON'))
  })
  vi.stubGlobal('fetch', mockFetch)

  const { result } = renderHook(() => useCountries())

  expect(result.current.loading).toBe(true)
  expect(result.current.error).toBe(null)

  await waitFor(() => {
    expect(result.current.error?.message).toBe('Invalid JSON')
  })

  expect(result.current.loading).toBe(false)
  expect(result.current.countries).toEqual([])
})

test('verifies that AbortController.abort() is called on unmount', () => {
  const mockAbort = vi.fn()
  const mockController = { signal: new AbortController().signal, abort: mockAbort }
  vi.stubGlobal('AbortController', vi.fn(() => mockController))

  const mockFetch = vi.fn(() => new Promise((): void => {
    return
  }))
  vi.stubGlobal('fetch', mockFetch)

  const { unmount } = renderHook(() => useCountries())

  unmount()

  expect(mockAbort).toHaveBeenCalled()
})

test('states remain unchanged after abort', () => {
  const mockController = {
    signal: { aborted: false },
    abort: function() {
      this.signal.aborted = true
    }
  }
  vi.stubGlobal('AbortController', vi.fn(() => mockController))

  const { result, unmount } = renderHook(() => useCountries())

  expect(result.current.loading).toBe(true)
  expect(result.current.error).toBe(null)
  expect(result.current.countries).toEqual([])

  unmount()

  expect(result.current.loading).toBe(true)
  expect(result.current.error).toBe(null)
  expect(result.current.countries).toEqual([])
})

test('handles empty countries list', async () => {
  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: { countries: [] } })
  })
  vi.stubGlobal('fetch', mockFetch)

  const { result } = renderHook(() => useCountries())

  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })

  expect(result.current.countries).toEqual([])
  expect(result.current.error).toBe(null)
})

test('validates country data format', async () => {
  const mockCountries = [
    { name: 'Estonia', code: 'EE' },
    { name: 'Finland', code: 'FI' },
    { name: 'Latvia', code: 'LV' }
  ]

  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: { countries: mockCountries } })
  })
  vi.stubGlobal('fetch', mockFetch)

  const { result } = renderHook(() => useCountries())

  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })

  result.current.countries.forEach(country => {
    expect(country).toHaveProperty('name')
    expect(country).toHaveProperty('code')
    expect(typeof country.name).toBe('string')
    expect(typeof country.code).toBe('string')
    expect(country.code).toMatch(/^[A-Z]{2}$/)  // ISO country codes are 2 uppercase letters
  })
})
