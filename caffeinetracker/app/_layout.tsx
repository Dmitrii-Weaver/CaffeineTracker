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
import { Platform } from 'react-native';
import { Stack } from 'expo-router';

// Configure Google Sign-In outside of the component
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: true,
});

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

  if (!process.env.EXPO_PUBLIC_WEB_CLIENT_ID) {
    console.log('Client ID is empty');
    return null;
  }

  const content = (
    <UserProvider>
      <GluestackUIProvider config={config}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Home />
        </ThemeProvider>
      </GluestackUIProvider>
    </UserProvider>
  );

  if (Platform.OS === 'web') {
    return (
      <GoogleOAuthProvider clientId={process.env.EXPO_PUBLIC_WEB_CLIENT_ID}>
        {content}
      </GoogleOAuthProvider>
    );
  }

  return content;
}
