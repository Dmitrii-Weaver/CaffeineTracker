import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormControlLabelText, Heading, Input, InputField, VStack, Text, Icon, HStack, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, ButtonText } from '@gluestack-ui/themed'
import { ScrollView } from 'react-native'
import { ChevronDownIcon, CheckIcon } from '@gluestack-ui/themed'
import { FiCoffee } from "react-icons/fi"
import { RiArrowDownWideFill, RiArrowUpWideFill } from "react-icons/ri"
import { FaChartBar } from "react-icons/fa"
import useLogCoffee from '@/hooks/useLogCoffee'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from "../../firebaseConfig"
import { Redirect } from 'expo-router'

const Log = () => {
  const [showInputForm, setShowInputForm] = useState(false)
  const [coffeeType, setCoffeeType] = useState("black")
  const [coffeeCost, setCoffeeCost] = useState(0)
  const [coffeeCostCurrency, setCoffeeCostCurrency] = useState("EUR")
  const [coffeeDecaf, setCoffeeDecaf] = useState(false)

  const auth = getAuth(app)

  const [user, setUser] = useState<User | null>(null); // Track user authentication state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  //if (user == null) {return <Redirect href="/signin" />}

  const SendCoffeeStamp = () => {
    var currentdate = new Date()
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds()

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

    if (user != null) {
      coffeeStamp.UID = user.uid
    }

    return (coffeeStamp)
  }



  const handleCostInput = (i: string) => {
    var x = parseInt(i, 10)
    if (isNaN(x)) {
      setCoffeeCost(0)
    } else {
      setCoffeeCost(x)
    }
  }

  const handleDecafChange = () => {
    setCoffeeDecaf(!coffeeDecaf)
  }

  const logCoffee = useLogCoffee()

  const handleLog = () => {
    logCoffee(user, SendCoffeeStamp())
  }

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="$backgroundLight0"
        py="$4"
        px="$4"
      >
        <Box
          w="$full"
          maxWidth="$96"
          p="$6"
          borderWidth="$1"
          borderRadius="$lg"
          bg="$white"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
        >
          {user ? (
            <VStack space="md">
              <Heading size="xl" textAlign="center">
                Caffeine Tracker
              </Heading>
              <Text textAlign="center">
                Monitor your coffee drinking habit with one click!
              </Text>

              <Heading size="lg">Cups of coffee had today: 4</Heading>
              <Text>Delicious!</Text>

              <Button onPress={handleLog} >
                <HStack space="sm" alignItems="center">
                  <ButtonText>Coffee had! +</ButtonText>
                  {/* <Icon as={FiCoffee} /> */}
                </HStack>
              </Button>

              {showInputForm ? (
                <VStack space="md">
                  <Select
                    onValueChange={(value: string) => setCoffeeType(value)}
                    selectedValue={coffeeType}
                  >
                    <SelectTrigger>
                      <SelectInput placeholder="Type" />
                      {/* <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon> */}
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Black" value="black" />
                        <SelectItem label="Black with milk" value="black with milk" />
                        <SelectItem label="Espresso" value="espresso" />
                        <SelectItem label="Double espresso" value="double espresso" />
                        <SelectItem label="Latte" value="latte" />
                        <SelectItem label="Cappuccino" value="cappuccino" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <HStack space="md">
                    <Input flex={1}>
                      <InputField
                        placeholder="Cost"
                        keyboardType="numeric"
                        onChangeText={handleCostInput}
                      />
                    </Input>
                    <Select
                      onValueChange={(value: string) => setCoffeeCostCurrency(value)}
                      selectedValue={coffeeCostCurrency}
                    >
                      <SelectTrigger>
                        <SelectInput placeholder="Currency" />
                        {/* <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                      </SelectIcon> */}
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          <SelectItem label="€" value="EUR" />
                          <SelectItem label="$" value="USD" />
                          <SelectItem label="₽" value="RUB" />
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  </HStack>

                  <HStack space="md" alignItems="center">
                    <Text>Decaf?</Text>
                    <Checkbox
                      value="decaf"
                      isChecked={coffeeDecaf}
                      onChange={handleDecafChange}
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>Decaf</CheckboxLabel>
                    </Checkbox>
                  </HStack>
                </VStack>
              ) : null}

              <Button onPress={() => setShowInputForm(!showInputForm)}>
                <HStack space="sm" alignItems="center">
                  <ButtonText>Detailed tracking</ButtonText>
                  {/* <Icon as={showInputForm ? RiArrowUpWideFill : RiArrowDownWideFill} /> */}
                </HStack>
              </Button>

              <Heading size="lg">Cups of coffee this week: 42</Heading>

              <Button>
                <HStack space="sm" alignItems="center">
                  <ButtonText>See stats!</ButtonText>
                  {/* <Icon as={FaChartBar} /> */}
                </HStack>
              </Button>
            </VStack>

          ) : <VStack space="md">
            <Text>Please sign in to start tracking</Text>
            <Box>
              <Button >
                <ButtonText><Redirect href="/signin" /></ButtonText>
              </Button>
            </Box>
          </VStack>}


        </Box>
      </Box>
    </ScrollView>
  )
}

export default Log