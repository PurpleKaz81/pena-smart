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
  const [qualifiers, setQualifiers] = useState<Qualifier[]>([])
  const [checkedQualifiers, setCheckedQualifiers] = useState<Qualifier[]>([])
  const [totalYears, setTotalYears] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:5000/api/qualifiers')
      .then(response => {
        setQualifiers(response.data)
      })
      .catch(error => console.error('Error fetching data: ', error))
  }, [])

  async function handleCheckboxChange(qualifier: Qualifier, event: ChangeEvent<HTMLInputElement>) {
    let newCheckedQualifiers = [...checkedQualifiers]
    if (event.target.checked) {
      newCheckedQualifiers.push(qualifier)
    } else {
      newCheckedQualifiers = newCheckedQualifiers.filter(q => q.id !== qualifier.id)
    }

    // Sort qualifiers based on their order in `qualifiers`
    newCheckedQualifiers.sort((a, b) => {
      return qualifiers.indexOf(a) - qualifiers.indexOf(b)
    })

    // Send the newCheckedQualifiers to the server
    try {
      const response = await axios.post('http://localhost:5000/api/calculateQualifierYears', {
        "qualifiers": newCheckedQualifiers
      })

      const data = response.data
      setCheckedQualifiers(data.checkedQualifiers)
      setTotalYears(data.totalYears)
      setBaseSentence(data.baseSentence)
    } catch (error) {
      console.error('Error fetching data: ', error)
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
              { checkedQualifiers[0]?.id === qualifier.id && checkedQualifiers.length > 1 ?
                <Tooltip label="Apenas qualifica o crime">
                  <Text visibility="visible">
                    {qualifier.years}
                  </Text>
                </Tooltip> :
                <Text visibility={checkedQualifiers.find(q => q.id === qualifier.id && q.years > 0) ? "visible" : "hidden"}>
                  {checkedQualifiers.find(q => q.id === qualifier.id)?.years || 0}
                </Text>
              }
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
          <Text visibility={checkedQualifiers.length > 1 ? "visible" : "hidden"}>{totalYears}</Text>
        </Box>
      </Flex>
      <Box>
        <PenaBase baseSentence={baseSentence} />
      </Box>
    </VStack>
  )
}
