import { useMemo, useState } from 'react'

import { Country } from '../interfaces/countries'

export const useCountryCodeSearch = (countries: Country[]) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const searchLower = searchTerm.toLowerCase().trim()
      return country.code.toLowerCase().includes(searchLower)
    })
  }, [countries, searchTerm])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  return {
    searchTerm,
    filteredCountries,
    handleSearch
  }
}
  
