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

  function handleCheckboxChange(qualifier: Qualifier, event: ChangeEvent<HTMLInputElement>) {
    let newCheckedQualifiers = [...checkedQualifiers]
    if (event.target.checked) {
      newCheckedQualifiers.push(qualifier)
    } else {
      newCheckedQualifiers = newCheckedQualifiers.filter(q => q.id !== qualifier.id)
    }

    axios.post('http://localhost:5000/api/calculateQualifierYears', { qualifiers: newCheckedQualifiers })
      .then(response => {
        setCheckedQualifiers(newCheckedQualifiers)
        setTotalYears(response.data.totalYears)
        setBaseSentence(response.data.baseSentence)
      })
      .catch(error => console.error('Error fetching data: ', error))
  }

    // // Sort qualifiers based on their order in `qualifiers`
    // newCheckedQualifiers.sort((a, b) => {
    //   return qualifiers.indexOf(a) - qualifiers.indexOf(b)
    // })

  //   const additionalYears = (newCheckedQualifiers.length > 1) ? (newCheckedQualifiers.length - 1) * 1.5 : 0
  //   newCheckedQualifiers.forEach((q, index) => {
  //     if (index === 0) {
  //       q.years = 0
  //     } else {
  //       q.years = 1.5
  //     }
  //   })

  //   setCheckedQualifiers(newCheckedQualifiers)
  //   setTotalYears(additionalYears)

  //   let newBaseSentence = baseSentence
  //   if (newCheckedQualifiers.length === 1) {
  //     newBaseSentence = 12 // when the first qualifier is selected, the base sentence becomes 12 years
  //   } else if (newCheckedQualifiers.length > 1) {
  //     newBaseSentence = 12 + additionalYears // for each additional qualifier beyond the first one, add 1.5 years
  //   } else {
  //     newBaseSentence = 6 // if there are no qualifiers, the base sentence is 6 years
  //   }
  //   setBaseSentence(newBaseSentence)
  // }


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
              {qualifier.years === 0
              ? <Tooltip label="Apenas qualifica o crime">
                  <Text visibility={checkedQualifiers.includes(qualifier) && checkedQualifiers.length > 1 ? "visible" : "hidden"}>
                    {qualifier.years}
                  </Text>
                </Tooltip>
              : <Text visibility={checkedQualifiers.includes(qualifier) && checkedQualifiers.length > 1 ? "visible" : "hidden"}>
                {qualifier.years}
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
