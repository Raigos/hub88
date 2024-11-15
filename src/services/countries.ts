import { parse } from 'graphql'

const COUNTRY_QUERY = parse(`
  query {
    continent(code: "EU") {
      code
      name
      countries {
        name
        code
      }
    }
  }
`)
