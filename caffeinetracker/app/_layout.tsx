import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider, Box } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/firebaseConfig';
import SignIn from './(tabs)/signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSignInLoading, setIsSignInLoading] = useState(true);

  // Handle user state changes
  function onAuthStateChangedCB(user: User | null) {
    console.log('onauthchanged');
    setUser(user);
    if (initializing) setInitializing(false);
    setIsSignInLoading(false);
  }

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
      setIsSignInLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!loaded || initializing || isSignInLoading) return null;

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {user ? (
          // Render the authenticated stack
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        ) : (
          // If user is not logged in, render the SignIn component
          <SignIn setIsSignInLoading={setIsSignInLoading} />
        )}
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
