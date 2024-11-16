import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Link, Stack, Typography } from '@mui/material'

import Hub88Logo from '../assets/hub88Logo.svg'


interface HeadingProps {
  heading: string;
  name: 'Raigo Tuulik';
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/raigo-tuulik/'


const Heading = ({ heading, name }: HeadingProps) => {

  return (
    <Stack spacing={1} alignItems="center">
      <Typography
        variant="h2"
        sx={{
          color: 'white',
          opacity: 0.75,
          letterSpacing: '1rem',
          fontWeight: 300,
          textAlign: 'center'
        }}
      >
        <img src={Hub88Logo} alt="Hub88 Logo" />
        {heading}
      </Typography>
      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textDecoration: 'none'
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          by
          <Typography
            component="span"
            variant="subtitle1"
          >
            {name}</Typography> · <LinkedInIcon sx={{ fontSize: 20 }} />
        </Typography>
      </Link>
    </Stack>
  )
}

export default Heading
