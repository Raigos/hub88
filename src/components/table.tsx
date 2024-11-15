import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const createData = (countryName: string, countryCode: string) => {
  return { countryName, countryCode: countryCode as string & { length: 2 } }
}

const rows = [
  createData('Estonia', 'EE'),
  createData('Finland', 'FI'),
  createData('Russia', 'RU'),
  createData('Sweden', 'SE'),
  createData('Latvia', 'LV'),
]

export function DataTable() {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
    >
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Country name</StyledTableCell>
            <StyledTableCell align="right">Country code</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.countryName}>
              <StyledTableCell
                component="th"
                scope="row"
              >
                {row.countryName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.countryCode}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
