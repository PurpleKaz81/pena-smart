import { VStack, StackDivider, Tooltip, Box, HStack, Checkbox, Text, Flex, Spacer } from "@chakra-ui/react"
import { useState, useEffect, ChangeEvent } from "react"
import PenaBase from "./PenaBase"
import axios from "axios"

interface Qualifier {
  id: string,
  label: string,
  value: string,
  years: number
}

export default function QualifierList() {
  const [baseSentence, setBaseSentence] = useState(6)
  const [qualifiers, setQualifiers] = useState([])
  const [selectedQualifiers, setSelectedQualifiers] = useState(0)
  const [totalYears, setTotalYears] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:5000/api/qualifiers')
      .then(response => {
        setQualifiers(response.data)
      })
      .catch(error => console.error('Error fetching data: ', error))
  }, [])

  function handleCheckboxChange(qualifier: Qualifier, event: ChangeEvent<HTMLInputElement>) {
    let newSelectedQualifiers = selectedQualifiers
    let newTotalYears = totalYears
    if (event.target.checked) {
      newSelectedQualifiers++
      newTotalYears += qualifier.years
    } else {
      newSelectedQualifiers--
      newTotalYears -= qualifier.years
    }

    let newBaseSentence = baseSentence
    if (newSelectedQualifiers === 1) {
      newBaseSentence = 12  // when the first qualifier is selected, the base sentence becomes 12 years
    } else if (newSelectedQualifiers > 1) {
      newBaseSentence += 1.5  // for each additional qualifier beyond the first one, add 1.5 years
    } else {
      newBaseSentence = 6  // if there are no qualifiers, the base sentence is 6 years
    }

    setBaseSentence(newBaseSentence)
    setSelectedQualifiers(newSelectedQualifiers)
    setTotalYears(newTotalYears)
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
      <Flex>
        <Box>
          Soma das qualificadoras:
        </Box>
        <Spacer />
        <Box>
          <Text visibility="hidden">{totalYears}</Text>
        </Box>
      </Flex>
      <Box>
        <PenaBase baseSentence={baseSentence} />
      </Box>
    </VStack>
  )
}
