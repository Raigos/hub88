import { Container, Divider, Paper } from '@mui/material'

import { DataTable } from './components/table.tsx'
import { TextFields } from './components/textfield.tsx'

import './App.css'


function App() {
  return (
    <>
      <Container>
        <Paper sx={{ p: 2 }}>
          <TextFields />
          <Divider />
          <DataTable />
        </Paper>
      </Container>
    </>
  )
}

export default App
