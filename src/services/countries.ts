import { parse } from 'graphql'

export const COUNTRY_QUERY = parse(`
  query {
    countries {
      name
      code
    }
  }
`)
