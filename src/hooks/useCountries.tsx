import { useEffect, useState } from 'react'

import { CountriesResponse, Country } from '../interfaces/countries.ts'
import { COUNTRY_QUERY } from '../services/countries.ts'


export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController()

    fetch('https://countries.trevorblades.com/', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: COUNTRY_QUERY.loc?.source.body
      })
    })
      .then(response => {
        if (response.status === 404) {
          throw new Error('API endpoint not found')
        }
        if (response.status === 429) {
          throw new Error('Too many requests - please try again later')
        }
        if (response.status === 500) {
          throw new Error('Internal server error')
        }
        if (!response.ok) {
          const statusCode = response.status
          throw new Error(`HTTP error! status: ${statusCode.toString()}`)
        }
        return response.json() as Promise<CountriesResponse>
      })
      .then(data => {
        setCountries(data.data.countries)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return { countries, loading, error }
}
