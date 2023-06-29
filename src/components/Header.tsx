import { Box, Heading } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box p={1} display="flex" justifyContent="center">
      <Heading as="h1" size="xl">Pena Smart</Heading>
    </Box>
  )
}
