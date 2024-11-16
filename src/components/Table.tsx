import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { Country } from '../interfaces/countries.ts'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export function DataTable({ countries }: { countries: Country[] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.2)',
        width: '100%'
      }}
    >
      <TableContainer>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead sx={{
            background: 'linear-gradient(145deg, rgba(140,74,151,0.2), rgba(31,26,81,0.2), rgba(18,90,169, 0.2))'
          }}>
            <TableRow>
              <StyledTableCell>Country name</StyledTableCell>
              <StyledTableCell align="right">Country code</StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <TableContainer sx={{ maxHeight: '400px', overflow: 'auto' }}>
        <Table
          sx={{ minWidth: 700 }}
        >
          <TableBody>
            {countries.map(country => (
              <StyledTableRow key={country.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                >
                  {country.name}
                </StyledTableCell>
                <StyledTableCell align="right">{country.code}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
