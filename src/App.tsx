import * as React from "react"
import HeaderSlogan from "./components/HeaderSlogan"
import Sentence from "./components/Sentence"
import { ChakraProvider, Box } from "@chakra-ui/react"

export default function App() {
  return (
      <ChakraProvider>
        <Box minH="100vh" minW="100vw" display="grid" gridTemplateRows="auto 1fr" alignItems="top" justifyContent="center">
          <HeaderSlogan />
          <Sentence />
        </Box>
      </ChakraProvider>
  )
}
