import { VStack, StackDivider, Tooltip, Box, HStack, Checkbox, Text, Flex, Spacer } from "@chakra-ui/react"
import { useState, useEffect, ChangeEvent } from "react"
import axios from "axios"

interface Qualifier {
  id: string,
  label: string,
  value: string,
  years: number
}

export default function QualifierList() {
  const [totalYears, setTotalYears] = useState(0)
  const [qualifiers, setQualifiers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/qualifiers')
      .then(response => {
        setQualifiers(response.data)
      })
      .catch(error => console.error('Error fetching data: ', error))
  }, [])

  function handleCheckboxChange(qualifier: Qualifier, event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setTotalYears(totalYears + qualifier.years)
    } else {
      setTotalYears(totalYears - qualifier.years)
    }
  }

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={1}
      align='stretch'
      mt={4}
    >
      {qualifiers.map((qualifier: Qualifier) => (
        <div className="qualifier" key={qualifier.id}>
          <Box>
            <HStack justifyContent="space-between" w="100%">
              <Checkbox
                spacing="1rem"
                id={qualifier.id}
                name={qualifier.id}
                value={qualifier.value}
                onChange={(event) => handleCheckboxChange(qualifier, event)}
              >
                <Tooltip label={qualifier.value}>
                  {qualifier.label}
                </Tooltip>
              </Checkbox>
              <Text visibility="hidden">{qualifier.years}</Text>
            </HStack>
          </Box>
        </div>
      ))}
      <div>
        <Flex>
          <Box>
            Soma das qualificadoras:
          </Box>
          <Spacer />
          <Box>
            <Text visibility="hidden">{totalYears}</Text>
          </Box>
        </Flex>
      </div>
    </VStack>
  )
}
