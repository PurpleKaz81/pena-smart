import QualifierList from "./QualifierList"
import { Box } from "@chakra-ui/react"

export default function Sentence() {
  return (
    <Box p={1} maxH="20rem" display="grid" alignItems="center" justifyContent="center">
      <h2>Clique nas qualificadoras do caso</h2>
      <QualifierList />
    </Box>
  )
}
