import { Box, CircularProgress, Container, Divider, Paper, Typography } from '@mui/material'

import { DataTable } from './components/table.tsx'
import { TextFields } from './components/textfield.tsx'
import { useCountries } from './hooks/useCountries.tsx'


const App = () => {
  const { countries, loading, error } = useCountries()


  return (
    <Container>
      <Paper sx={{ p: 2 }}>
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
          <>
            <TextFields />
            <Divider />
            <DataTable />
          </>
        )}
        {/*<ul>*/}
        {/*  {countries.map(country => (*/}
        {/*    <li key={country.code}>*/}
        {/*      {country.name} ({country.code})*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      </Paper>
    </Container>
  )
}

export default App
