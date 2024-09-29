import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, Heading, Input, InputField, VStack, useToast, Text, Link } from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import {app} from "../../firebaseConfig"
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';


type FormData = {
    email: string;
    username: string;
    inputPassword: string;
    repeatPassword: string;
};

export default function Register() {
    const toast = useToast()
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);

    const inputPassword = watch("inputPassword")

    const auth = getAuth(app)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleAuthentication = async () => {
        try {
          if (user) {
            // If user is already authenticated, log out
            console.log('User logged out successfully!');
            await signOut(auth);
          } else {
            // Sign in or sign up
            if (isLogin) {
              // Sign in
              await signInWithEmailAndPassword(auth, email, password);
              console.log('User signed in successfully!');
            } else {
              // Sign up
              await createUserWithEmailAndPassword(auth, email, password);
              console.log('User created successfully!');
            }
          }
        } catch (error) {
          console.error('Authentication error:', error.message);
        }
      };
    

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)

        handleAuthentication()

        console.log(email, username, password)

        toast.show({
            render: () => {
                return (
                    <Box bg="$green500" px="$4" py="$2" rounded="$sm" mb={5}>
                        <Text color="$white">Registration Successful</Text>
                    </Box>
                )
            },
        })
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box
                flex={1}
                bg="$backgroundLight0"
                py="$4"
                px="$4"
                justifyContent="center"
                alignItems="center"
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
                    <Heading size="xl" mb="$4" textAlign="center">
                        Register for Caffeine Tracker
                    </Heading>

                    <VStack space="md">
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
                                            onChangeText={onChange}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={!!errors.username}>
                                    <FormControlLabel>
                                        <FormControlLabelText>Username</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            placeholder="Enter your username"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={value}
                                            autoCapitalize="none"
                                        />
                                    </Input>
                                    {errors.username ? (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.username.message}</Text>
                                        </FormControlHelper>
                                    ) : null}
                                </FormControl>
                            )}
                            name="username"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'inputPassword is required',
                                minLength: {
                                    value: 6,
                                    message: 'inputPassword must be at least 6 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={!!errors.inputPassword}>
                                    <FormControlLabel>
                                        <FormControlLabelText>inputPassword</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            placeholder="Enter your inputPassword"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={value}
                                            secureTextEntry
                                        />
                                    </Input>
                                    {errors.inputPassword ? (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.inputPassword.message}</Text>
                                        </FormControlHelper>
                                    ) : null}
                                </FormControl>
                            )}
                            name="inputPassword"
                        />

                        <Controller
                            control={control}
                            rules={{
                                validate: value => value === inputPassword || 'Passwords do not match'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={!!errors.repeatPassword}>
                                    <FormControlLabel>
                                        <FormControlLabelText>Repeat Password</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            placeholder="Repeat your password"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            secureTextEntry
                                        />
                                    </Input>
                                    {errors.repeatPassword ? (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.repeatPassword.message}</Text>
                                        </FormControlHelper>
                                    ) : null}
                                </FormControl>
                            )}
                            name="repeatPassword"
                        />

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            isDisabled={isLoading}
                        >
                            <Text color="$white" fontWeight="$bold">
                                Register
                            </Text>
                        </Button>
                    </VStack>

                    <Text mt="$3" textAlign="center">
                        Already have an account?{" "}
                        <Link href="/signin">
                            <Text color="$blue600">Sign in</Text>
                        </Link>
                    </Text>
                </Box>
            </Box>
        </ScrollView>
    )
}
