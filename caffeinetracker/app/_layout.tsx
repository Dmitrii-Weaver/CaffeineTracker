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

// Configure Google Sign-In outside of the component
GoogleSignin.configure({
  webClientId: "860678435952-9a7ga3tcfqbnopbs09ifpjn64ae4qil7.apps.googleusercontent.com",
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


  return (
    <UserProvider>
      <GluestackUIProvider config={config}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Home/>
        </ThemeProvider>
      </GluestackUIProvider>
    </UserProvider>

  );
}
