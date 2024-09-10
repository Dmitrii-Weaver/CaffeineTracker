import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,

  Text,
  useColorModeValue,
  Link,
  Heading,
  VStack,
  Select,
  Checkbox,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'


import { FiCoffee } from "react-icons/fi";
import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";


const log = () => {
  const [showInputForm, setShowInputForm] = useState(false)

  return (
    <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Caffeine Tracker
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Monitor your coffee drinking habit with one click!
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <VStack>
                <Box>
                  <Heading size={"lg"}>Cups of coffee had today: 4</Heading>
                </Box>
                <Text>Delicious!</Text>


                <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }}>
                  Coffee had! +
                  <Icon as={FiCoffee} />
                </Button>

                <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} onClick={() => setShowInputForm(!showInputForm)}>
                  {showInputForm ?
                    <> <Text>Detailed tracking &nbsp;</Text> <Icon as={RiArrowDownWideFill} /></> :
                    <> <Text>Detailed tracking &nbsp;</Text> <Icon as={RiArrowUpWideFill} /></>
                  }
                </Button>

                <VStack display={showInputForm ? "flex" : "none"}>
                  <InputGroup>
                    <VStack>
                      <Select placeholder='Type'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                      </Select>
                      <HStack>
                        <Input placeholder='Cost'></Input>
                        <Select>
                          <option value='USD'>$</option>
                          <option value='EUR'>€</option>
                          <option value='RUB'>₽</option>
                        </Select>
                      </HStack>
                      <HStack>
                        <Text>Decaf?</Text>
                        <Checkbox></Checkbox>
                      </HStack>
                    </VStack>
                  </InputGroup>
                </VStack>

              </VStack>
              <Heading size={"lg"}>Cups of coffee this week: 42</Heading>
              <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }}>
                <Text>See stats! &nbsp;</Text>
                <Icon as={FaChartBar} />
              </Button>


            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  )
}

export default log