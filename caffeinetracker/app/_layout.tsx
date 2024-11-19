import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { UserProvider } from '@/store';
import { Home } from '@/components/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Configure Google Sign-In outside of the component
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });



  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

 console.log(process.env.EXPO_PUBLIC_WEB_CLIENT_ID)

 if (!process.env.EXPO_PUBLIC_WEB_CLIENT_ID) {

  console.log('Client ID is empty')

  return null
 }
  
 return (
    <GoogleOAuthProvider clientId={process.env.EXPO_PUBLIC_WEB_CLIENT_ID}>
      <UserProvider>
        <GluestackUIProvider config={config}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Home />
          </ThemeProvider>
        </GluestackUIProvider>
      </UserProvider>
    </GoogleOAuthProvider>

  );
}
