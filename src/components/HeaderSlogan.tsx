import Header from "./Header"
import Slogan from "./Slogan"
import { Box } from "@chakra-ui/react"

export default function HeaderSlogan() {
  return (
    <Box p={1} maxH="5rem" display="grid" alignItems="center" justifyContent="center">
        <Header />
        <Slogan />
    </Box>
  )
}
