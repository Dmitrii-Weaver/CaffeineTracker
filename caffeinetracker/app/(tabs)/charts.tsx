import { Box, Button, ButtonText, Heading, HStack, ScrollView, VStack } from '@gluestack-ui/themed'
import { Redirect, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from "../../firebaseConfig"
import useGetUsernameByUid from '@/hooks/useGetUsernameByUid'
import useGetCoffeeDataByUid from '@/hooks/useGetCoffeeDataByUid'
import useHandleAuth from '@/hooks/useHandleAuth'


const Charts = () => {


  const auth = getAuth(app)

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

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