import { Box, Button, ButtonText, Heading, HStack, ScrollView, VStack, Text } from '@gluestack-ui/themed'
import { Redirect, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from "../../firebaseConfig"
import useGetUsernameByUid from '@/hooks/useGetUsernameByUid'
import useGetCoffeeDataByUid from '@/hooks/useGetCoffeeDataByUid'
import useHandleAuth from '@/hooks/useHandleAuth'
import CustomLineChart from '@/components/CustomLineChart'
import { Image } from '@gluestack-ui/themed'
import { Dimensions } from 'react-native'


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
              {coffeeData ? <Text textAlign="center" color='black'>last coffee logged on {coffeeData[coffeeData.length - 1].timestamp.fulldate}</Text>
                : null}

              {coffeeData ?
                <CustomLineChart coffeeData={coffeeData} />
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

