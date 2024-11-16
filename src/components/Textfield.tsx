import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import React from 'react'


const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'transparent'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent'
    },
    '&:hover fieldset': {
      borderColor: 'transparent'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(255, 255, 255, 0.2)'
    },
    '& .MuiInputBase-input': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  }
})

interface CountryCodeSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CountryCodeSearch = ({ value, onChange }: CountryCodeSearchProps) => {
  return (
    <CustomTextField
      autoFocus
      value={value}
      onChange={onChange}
      placeholder="Search by country code..."
      fullWidth
    />
  )
}
