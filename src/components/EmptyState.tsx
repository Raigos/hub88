import { Box, styled, Typography } from '@mui/material'
import { useMemo } from 'react'

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  minHeight: 160,
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius
}))

const EMPTY_STATE_EMOTICONS = [
  '¯\\_(ツ)_/¯',
  '(◕︵◕)',
  '🙈',
  '(･.･;)',
  '🤔',
  '👀',
  '🗺️',
  '(；一_一)',
  '🔍',
  '(～￣▽￣)～'
]

const EMPTY_STATE_MESSAGES = [
  'Is this a country code or your cat walking on the keyboard?',
  'Plot twist: This isn\'t a valid country code (but I still deserve the job!)',
  'Legend says if you type this code three times in a mirror, a country appears...',
  'Error 404: Country Not Found (but a great developer was found instead)',
  'In a parallel universe, this might be a valid country code. But here we are.',
  'Breaking News: Developer Handles Invalid Input Like a Pro, Hire Immediately',
  'Have you tried turning it off and on again? Still no country?',
  'Testing edge cases like a boss (future employee reference)',
  'This country code is social distancing from our database',
  'Invalid code handled successfully. *wink wink, nudge nudge*'
]

const useRandomEmptyState = () => {
  return useMemo(() => {
    const randomEmoticon = EMPTY_STATE_EMOTICONS[Math.floor(Math.random() * EMPTY_STATE_EMOTICONS.length)]
    const randomMessage = EMPTY_STATE_MESSAGES[Math.floor(Math.random() * EMPTY_STATE_MESSAGES.length)]
    return { emoticon: randomEmoticon, message: randomMessage }
  }, [])
}

export const EmptyState = () => {
  const { emoticon, message } = useRandomEmptyState()

  return (
    <EmptyStateContainer>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 1,
          textAlign: 'center',
          fontSize: '3rem'
        }}
      >
        {emoticon}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          fontStyle: 'italic'
        }}

      >
        {message}
      </Typography>
    </EmptyStateContainer>
  )
}
