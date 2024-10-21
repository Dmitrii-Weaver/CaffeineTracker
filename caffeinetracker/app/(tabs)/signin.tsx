import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, Heading, Input, InputField, VStack, useToast, Text, ButtonText } from '@gluestack-ui/themed'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'

import { app } from "../../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User, GoogleAuthProvider, signInWithCredential } from '@firebase/auth';
import useHandleAuth, { ActionType } from '@/hooks/useHandleAuth'
import { Redirect, router } from 'expo-router'
import Register from '@/components/Register'
import TextWithLink from '@/components/TextWithLink';
import { FirebaseError } from 'firebase/app';
import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';




type FormData = {
    email: string;
    password: string;
};

export default function SignIn({ setIsSignInLoading }: { setIsSignInLoading: (loading: boolean) => void }) {
    const toast = useToast()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState<User | null>(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [redirectToLog, setRedirectToLog] = useState(false);

    const auth = getAuth(app)

    const handleAuth = useHandleAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setRedirectToLog(true);
            } else {
                setRedirectToLog(false);
            }
            setIsSignInLoading(false);
        });

        return () => unsubscribe();
    }, [auth, setIsSignInLoading]);

    useEffect(() => {
        if (redirectToLog) {
            router.replace('/log');
        }
    }, [redirectToLog]);

    const onGoogleButtonPress = async () => {
        try {
            setIsSignInLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (!userInfo.data?.idToken) {
                console.log('No ID token found');
                setIsSignInLoading(false);
                return;
            }
            const googleCredential = GoogleAuthProvider.credential(userInfo.data?.idToken);
            const response = await signInWithCredential(auth, googleCredential);

            if (response.user) {
                const result = await handleAuth(userInfo.data.user, auth, ActionType.LOGIN_GOOGLE, email, password);
                handleAuthResponse(result);
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
            }
        } finally {
            setIsSignInLoading(false);
        }
    }

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setAuthError(null)

        try {
            const result = await handleAuth(null, auth, ActionType.LOGIN_EMAIL_PASS, email, password)
            handleAuthResponse(result)
        } catch (error) {
            setAuthError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const handleAuthResponse = (result: { success: boolean; message: string }) => {
        if (result.success) {
            toast.show({
                render: () => {
                    return (
                        <Box backgroundColor="$green500" paddingHorizontal={4} paddingVertical={2} borderRadius={2} marginBottom={5}>
                            <Text color="$white">{result.message}</Text>
                        </Box>
                    )
                },
            })
        } else {
            setAuthError(result.message ?? null)
        }
    }

    if (showRegister) {
        return <>
            {user ? (
                <Box>
                    <Redirect href="/log" />
                </Box>
            ) : null}
            <Register onBackToSignIn={() => setShowRegister(false)} />
        </>;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box
                flex={1}
                backgroundColor="$backgroundLight0"
                py="$4"
                px="$4"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    w="$full"
                    maxWidth={400}
                    p="$6"
                    borderWidth={1}
                    borderRadius={8}
                    backgroundColor="$white"
                    shadowColor="$shadowColor"
                    shadowOffset={{ width: 0, height: 2 }}
                    shadowOpacity={0.25}
                    shadowRadius={3.84}
                    elevation={5}
                >
                    <Heading fontSize={25} marginBottom={4} textAlign="center">
                        Welcome to Caffeine Tracker!
                    </Heading>
                    {user ? (
                        <Box>
                            <Text>Logged in as {user.email}</Text>
                            <Redirect href="/log" />
                            <Button onPress={() => handleAuth(user, auth, ActionType.LOGOUT, email, password)}>
                                <ButtonText>Logout</ButtonText>
                            </Button>
                        </Box>
                    ) : null}

                    <VStack space="md" >
                        <Controller
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid email address',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={!!errors.email}>
                                    <FormControlLabel>
                                        <FormControlLabelText>Email</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            placeholder="Enter your email"
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setEmail(text);
                                            }}
                                            value={value}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </Input>
                                    {errors.email ? (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.email.message}</Text>
                                        </FormControlHelper>
                                    ) : null}
                                </FormControl>
                            )}
                            name="email"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={!!errors.password}>
                                    <FormControlLabel>
                                        <FormControlLabelText>Password</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            placeholder="Enter your password"
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setPassword(text);
                                            }}
                                            secureTextEntry
                                        />
                                    </Input>
                                    {errors.password ? (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.password.message}</Text>
                                        </FormControlHelper>
                                    ) : null}
                                </FormControl>
                            )}
                            name="password"
                        />

                        {authError && (
                            <FormControl isInvalid={true}>
                                <FormControlHelper>
                                    <Text color="$error600">{authError}</Text>
                                </FormControlHelper>
                            </FormControl>
                        )}

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            disabled={isLoading}
                        >
                            <Text color="$white" fontWeight="$bold">
                                {isLoading ? "Loading..." : "Sign In"}
                            </Text>
                        </Button>
                        <Button
                            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                        ></Button>
                    </VStack>

                    <TextWithLink
                        text="Don't have an account?"
                        linkText="Register"
                        onPress={() => setShowRegister(true)}
                    />
                </Box>
            </Box>
        </ScrollView>
    )
}
