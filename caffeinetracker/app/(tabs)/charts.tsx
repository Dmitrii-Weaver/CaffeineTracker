import { Box, Button, ButtonText, Heading, HStack, ScrollView, VStack, Text, SelectTrigger, SelectInput, SelectPortal, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed'
import { Redirect, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from "../../firebaseConfig"
import useGetUsernameByUid from '@/hooks/useGetUsernameByUid'
import useGetCoffeeDataByUid from '@/hooks/useGetCoffeeDataByUid'
import useHandleAuth from '@/hooks/useHandleAuth'
import CustomLineChartWeek from '@/components/CustomLineChartWeek'
import { Image } from '@gluestack-ui/themed'
import { Dimensions } from 'react-native'
import { Select } from '@gluestack-ui/themed'
import { SelectBackdrop } from '@gluestack-ui/themed'


const Charts = () => {


  const currentdate = new Date()



  const auth = getAuth(app)

  const [user, setUser] = useState<User | null>(null);
  const { username, isLoading: usernameLoading, error: usernameError } = useGetUsernameByUid(user)
  const { coffeeData, isLoading: coffeeDataLoading, error: coffeeDataError } = useGetCoffeeDataByUid(user)
  const [chart, setChart] = useState("Week")


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  console.log(coffeeData)

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Image source={require("@/assets/images/coffeebg.png")} alt="bg" position='absolute' width={Dimensions.get("window").width} height={Dimensions.get("window").height} />
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        py="$4"
        px="$4"
      >
        <Box
          w="$full"
          maxWidth="$96"
          p="$6"
          borderWidth="$2"
          borderRadius="$lg"
          bg="#B0968E"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
        >
          {user ? (
            <VStack space="md">
              <Heading size="xl" textAlign="center">
                Your coffee stats :
              </Heading>
              {coffeeData ? <Text textAlign="center" color='black'>last coffee logged on {coffeeData[coffeeData.length - 1].timestamp.fulldate}</Text> : null}

              <Select
                onValueChange={(value: string) => setChart(value)}
                selectedValue={chart}
              >
                <SelectTrigger borderColor='black'>
                  <SelectInput placeholder="Type" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Today" value="Day" />
                    <SelectItem label="This week" value="Week" />
                    <SelectItem label="This month" value="Month" />
                    <SelectItem label="This year" value="Year" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              {coffeeData ?
                <Box display={chart == "Week" ? "flex" : "none"} >  <CustomLineChartWeek coffeeData={coffeeData} /></Box>
                : null}
              <Button onPress={() => { router.replace('/log'); }}
                backgroundColor='#6A5650'

                $hover-bgColor='#59453F'>
                <HStack space="sm" alignItems="center">
                  <ButtonText>  Back to log page  </ButtonText>



                </HStack>
              </Button>
            </VStack>

          ) : <VStack space="md">
            <Text>Please sign in to start tracking</Text>
            <Redirect href="/signin" />
          </VStack>}


        </Box>
      </Box>
    </ScrollView>
  )
}

export default Charts

