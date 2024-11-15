export interface Country {
  name: string
  code: Uppercase<`${string & { length: 1 }}${string & { length: 1 }}`>
}

export interface CountriesResponse {
  data: {
    countries: Country[]
  }
}
