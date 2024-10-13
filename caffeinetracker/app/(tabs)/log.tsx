import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Input, InputField, VStack, Text, Icon, HStack, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, ButtonText } from '@gluestack-ui/themed'
import { ScrollView } from 'react-native'
import useLogCoffee from '@/hooks/useLogCoffee'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from "../../firebaseConfig"
import { Redirect, router } from 'expo-router'
import useHandleAuth from '@/hooks/useHandleAuth'
import useGetUsernameByUid from '@/hooks/useGetUsernameByUid'
import useGetCoffeeDataByUid from '@/hooks/useGetCoffeeDataByUid'

//icons import
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CheckIcon } from '@gluestack-ui/themed'
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Log = () => {
  const [showInputForm, setShowInputForm] = useState(false)
  const [coffeeType, setCoffeeType] = useState("black")
  const [coffeeCost, setCoffeeCost] = useState(0)
  const [coffeeCostCurrency, setCoffeeCostCurrency] = useState("EUR")
  const [coffeeDecaf, setCoffeeDecaf] = useState(false)
  const currentdate = new Date()

  const auth = getAuth(app)
  const handleAuth = useHandleAuth()

  const [user, setUser] = useState<User | null>(null);
  const { username, isLoading: usernameLoading, error: usernameError } = useGetUsernameByUid(user)
  const { coffeeData, isLoading: coffeeDataLoading, error: coffeeDataError } = useGetCoffeeDataByUid(user)

  const [dailyCoffeeCount, setDailyCoffeeCount] = useState(0)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const coffeeCountDay = () => {
    var today = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear()
    var coffeesToday = 0

    coffeeData.map((i: any) => {
      var coffeeDate = i.timestamp.day + "/" + i.timestamp.month + "/" + i.timestamp.year
      if (today == coffeeDate) {
        coffeesToday += 1
      }
    })
    return coffeesToday
  }

  const SendCoffeeStamp = () => {
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
    if (dailyCoffeeCount == 0) {
      setDailyCoffeeCount(coffeeCountDay() + 1)
    }
    else {
      setDailyCoffeeCount(dailyCoffeeCount + 1)
    }
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
              {usernameLoading ? (
                <Text textAlign="center">Loading username...</Text>
              ) : usernameError ? (
                <Text textAlign="center">Error loading username</Text>
              ) : (
                <HStack space="sm" alignItems="center" justifyContent='center'>
                  <Text textAlign="center">
                    Logged in as {username}
                  </Text>
                  <AntDesign name="logout" size={24} color="black" onPress={() => handleAuth(user, auth, "", "", "", "")} />
                </HStack>

              )}

              <Text textAlign="center">
                Monitor your coffee drinking habit with one click!
              </Text>

              <Button onPress={handleLog} >
                <HStack space="sm" alignItems="center">
                  <ButtonText textAlignVertical='center'>Coffee had! <MaterialCommunityIcons name="coffee" size={20} color="white" /></ButtonText>
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
                  <ButtonText> {showInputForm == true ? "Hide details" : "Show Details"} </ButtonText>
                </HStack>
              </Button>


              <Heading size="lg" textAlign='center'>Cups of coffee had today: {coffeeData ? (dailyCoffeeCount == 0 ? coffeeCountDay() : dailyCoffeeCount) : 0} </Heading>

              <Button onPress={() => { router.replace('/charts'); }}>
                <HStack space="sm" alignItems="center">
                  <ButtonText>  See stats! <FontAwesome name="bar-chart" size={24} color="white" /> </ButtonText>
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