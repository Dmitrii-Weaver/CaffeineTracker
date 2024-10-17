import { Box, Button, ButtonText, Heading, HStack, ScrollView, VStack,Text } from '@gluestack-ui/themed'
import { Redirect, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from "../../firebaseConfig"
import useGetUsernameByUid from '@/hooks/useGetUsernameByUid'
import useGetCoffeeDataByUid from '@/hooks/useGetCoffeeDataByUid'
import useHandleAuth from '@/hooks/useHandleAuth'
import CustomLineChart from '@/components/CustomLineChart'


const Charts = () => {


  const currentdate = new Date()



  const auth = getAuth(app)

  const [user, setUser] = useState<User | null>(null);
  const { username, isLoading: usernameLoading, error: usernameError } = useGetUsernameByUid(user)
  const { coffeeData, isLoading: coffeeDataLoading, error: coffeeDataError } = useGetCoffeeDataByUid(user)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  console.log(coffeeData)

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
                Your coffee stats :
              </Heading>
              {coffeeData ? <Text textAlign="center">last coffee logged on {coffeeData[coffeeData.length - 1].timestamp.fulldate}</Text>
                : null}
              <CustomLineChart />
              <Button onPress={() => { router.replace('/log'); }}>
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

