import { Flex, Box, Heading, Spacer, Text } from "@chakra-ui/react"

interface PenaBaseProps {
    baseSentence: number
}

export default function PenaBase({ baseSentence }: PenaBaseProps) {
    return (
        <div>
          <Flex>
            <Box>
              <Heading as="h3" size="md">Pena-base: </Heading>
            </Box>
            <Spacer />
            <Box>
              <Text visibility="visible">{baseSentence}</Text>
            </Box>
          </Flex>
        </div>
    )
}
