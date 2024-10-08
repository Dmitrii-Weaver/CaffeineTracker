import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, Heading, Input, InputField, VStack, useToast, Text, Link } from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { app } from "../../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import useHandleAuth from '@/hooks/useHandleAuth';
import { User } from 'firebase/auth';

type FormData = {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
};

export default function Register() {
    const toast = useToast()
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState(false);

    const repeatPassword = watch("repeatPassword")

    const auth = getAuth(app)

    const handleAuth = useHandleAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);


    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)

        handleAuth(user, auth, isLogin, email, password, username)

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
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setUsername(text);
                                            }}
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
                                            value={value}
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

                        <Controller
                            control={control}
                            rules={{
                                validate: value => value === password || 'Passwords do not match'
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

                    <Text mt="$4" textAlign="center">
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
