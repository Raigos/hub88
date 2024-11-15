import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export const TextFields = () => {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Search"
        variant="outlined"
      />
    </Box>
  )
}
