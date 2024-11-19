import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, Heading, Input, InputField, VStack, useToast, Text, ButtonText, Image } from '@gluestack-ui/themed'
import { Controller, useForm } from 'react-hook-form'
import { Dimensions, ScrollView, Platform } from 'react-native'

import { app } from "../../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, GoogleAuthProvider, signInWithCredential } from '@firebase/auth';
import useHandleAuth, { ActionType } from '@/hooks/useHandleAuth'
import { Redirect, router } from 'expo-router'
import Register from '@/components/Register'
import TextWithLink from '@/components/TextWithLink';
import { FirebaseError } from 'firebase/app';
import { Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
//web
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { UserData, useUser } from '../../store';




type FormData = {
    email: string;
    password: string;
};

export default function SignIn() {
    const toast = useToast()
    const { user } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)

    const [showRegister, setShowRegister] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [redirectToLog, setRedirectToLog] = useState(false);
    const auth = getAuth(app)
    const handleAuth = useHandleAuth()


    useEffect(() => {

    }, [user]);


    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (!userInfo.data?.idToken) {
                console.log('No ID token found');
                return;
            }
            const googleCredential = GoogleAuthProvider.credential(userInfo.data?.idToken);
            const response = await signInWithCredential(auth, googleCredential);

            if (response.user) {
                const result = await handleAuth(userInfo.data.user, ActionType.LOGIN_GOOGLE, email, password);
                handleAuthResponse(result);
            }else {
                console.log('response.user is undefined');
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleGoogleWebLogin = async (response: CredentialResponse) => {
        // Get the Google OAuth token
        const idToken = response.credential;
    
        // Create a GoogleAuthProvider credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);

        // Sign in with the credential using Firebase Auth
        try {
            const userCredential = await signInWithCredential(auth, googleCredential)
            const user = userCredential.user;

            if(user) {
                console.log('Logged in as:', user.displayName);
                const result = await handleAuth(user, ActionType.LOGIN_GOOGLE, email, password);
                handleAuthResponse(result);
            } else {
                console.log('user is undefined');
            }

        } catch (error) {
            console.error('Error during login:', error);

        }    
      
      };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setAuthError(null)

        try {
            const result = await handleAuth(null, ActionType.LOGIN_EMAIL_PASS, email, password)
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
            <Image source={require("@/assets/images/coffeebg.png")} alt="bg" position='absolute' width={Dimensions.get("window").width} height={Dimensions.get("window").height} />
            <Box
                flex={1}
                py="$4"
                px="$4"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    w="$full"
                    maxWidth={400}
                    p="$6"
                    borderWidth={2}
                    borderRadius={8}
                    backgroundColor="#B0968E"
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
                            <Text>Logged in as {user.username}</Text>
                            <Redirect href="/log" />
                            <Button onPress={() => handleAuth(null, ActionType.LOGOUT, email, password)}>
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
                                    <Input borderColor='black'>
                                        <InputField
                                            placeholder="Enter your email"
                                            placeholderTextColor={"black"}
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
                                    <Input borderColor='black'>
                                        <InputField
                                            placeholder="Enter your password"
                                            placeholderTextColor={"black"}
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
                            backgroundColor='#6A5650'

                            $hover-bgColor='#59453F'
                        >
                            <Text color="$white" fontWeight="$bold">
                                {isLoading ? "Loading..." : "Sign In"}
                            </Text>
                        </Button>
                        <GoogleSigninButton
                            size={GoogleSigninButton.Size.Wide}
                            style={{ width: '100%' }}
                            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                        />
                        {/* WEB <Button
                                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                                variant="outline"
                                mt="$4"
                            >
                                <Text color="$blue600">Sign in with Google</Text>
                            </Button> */}
                        {Platform.OS === 'web' && (

                            <GoogleLogin
                                onSuccess={credentialResponse => handleGoogleWebLogin(credentialResponse)}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        )}
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
