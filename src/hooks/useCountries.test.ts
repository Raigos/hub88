import { renderHook, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, test } from 'vitest'

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
