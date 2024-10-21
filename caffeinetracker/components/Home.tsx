import React, { useEffect } from 'react'
import { Stack } from 'expo-router';
import SignIn from '@/app/(tabs)/signin';
import {  useUser } from '@/store';


export const Home = () => {
    const { user} = useUser();

    
    useEffect(() => {
      
    }, [user]);

  return (
    <>
    {user ? (
        // Render the authenticated stack
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        // If user is not logged in, render the SignIn component
        <SignIn  />
      )}
      </>
  )
}
