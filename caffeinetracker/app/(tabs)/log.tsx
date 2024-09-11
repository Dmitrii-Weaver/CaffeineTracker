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
  const [coffeeType, setCoffeeType] = useState("black")
  const [coffeeCost, setCoffeeCost] = useState(0)
  const [coffeeCostCurrency, setCoffeeCostCurrency] = useState("EUR")
  const [coffeeDecaf, setCoffeeDecaf] = useState(false)



  const SendCoffeeStamp = () => {

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    if (isNaN(coffeeCost)) {
      setCoffeeCost(0)
    }

    let coffeeStamp = {
      UID: "1",
      timestamp: {
        fulldate: datetime,
        year: currentdate.getFullYear(),
        month: currentdate.getMonth() + 1,
        day: currentdate.getDate(),
        time: currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
      },
      type: coffeeType,
      cost: coffeeCost,
      costCurrency: coffeeCostCurrency,
      decaf: coffeeDecaf

    }

    console.log(coffeeStamp)
  }

  const handleCostInput = (i) => {
    var x = parseInt(i, 10);
    if (isNaN(x)) {
      setCoffeeCost(0)
    }
    else {
      setCoffeeCost(x)
    }

  }

  const handleDecafChange = () => {
    setCoffeeDecaf(!coffeeDecaf)
  }


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


                <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} onClick={() => SendCoffeeStamp()}>
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
                      <Select placeholder='Type' onChange={(e) => setCoffeeType(e.target.value)}>
                        <option value='black'>Black</option>
                        <option value='black with milk'>Black with milk</option>
                        <option value='espresso'>Espresso</option>
                        <option value='double espresso'>Double espresso</option>
                        <option value='latte'>Latte</option>
                        <option value='cappuccino'>Cappuccino</option>
                      </Select>
                      <HStack>
                        <Input placeholder='Cost' type="text" pattern="[0-9]*" onChange={(e) => handleCostInput(e.target.value)}></Input>
                        <Select onChange={(e) => setCoffeeCostCurrency(e.target.value)}>
                          <option value='EUR'>€</option>
                          <option value='USD'>$</option>
                          <option value='RUB'>₽</option>
                        </Select>
                      </HStack>
                      <HStack>
                        <Text>Decaf?</Text>
                        <Checkbox checked={coffeeDecaf} onChange={handleDecafChange}></Checkbox>
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