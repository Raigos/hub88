import { Box, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material'

import Heading from './components/Heading.tsx'
import { DataTable } from './components/Table'
import { CountryCodeSearch } from './components/Textfield'
import { useCountries } from './hooks/useCountries'
import { useCountryCodeSearch } from './hooks/useCountryCodeSearch'


const App = () => {
  const { countries, loading, error } = useCountries()
  const { filteredCountries, handleSearch, searchTerm } = useCountryCodeSearch(countries)

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'Column',
        gap: '16px'
      }}>
      <Heading
        heading={'ub88 Test Task'}
        name={'Raigo Tuulik'}
      />

      <Paper
        elevation={24}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 800,
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: 2
        }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" color="error.main">
            <Typography color="error" variant="body2">
              Error: {error.message}
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            <CountryCodeSearch
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
            />
            <DataTable countries={filteredCountries} />
          </Stack>
        )}
      </Paper>
    </Container>
  )
}

export default App
