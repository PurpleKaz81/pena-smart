import QualifierList from "./QualifierList"
import { Box, Heading } from "@chakra-ui/react"

export default function Sentence() {
  return (
    <Box p={1} maxH="35rem">
      <Heading as="h2" size="md" textAlign="center" pb={4}>Homicídio Qualificado</Heading>
      <Heading as="h3" size="md">Clique nas qualificadoras do caso</Heading>
      <QualifierList />
    </Box>
  )
}
