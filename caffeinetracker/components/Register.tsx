import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, Heading, Image, Input, InputField, VStack, useToast, Text, ButtonText } from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ScrollView } from 'react-native';

import { app } from "../firebaseConfig"
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import useHandleAuth from '@/hooks/useHandleAuth';

type FormData = {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
};

type RegisterProps = {
    onBackToSignIn: () => void;
}

export default function Register({ onBackToSignIn }: RegisterProps) {
    const toast = useToast()
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [isLogin] = useState(false);

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
                    maxWidth="$96"
                    p="$6"
                    borderWidth="$2"
                    borderRadius="$lg"
                    bg="#B0968E"
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
                                    {errors.email && (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.email.message}</Text>
                                        </FormControlHelper>
                                    )}
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
                                    <Input borderColor='black'>
                                        <InputField
                                            placeholder="Enter your username"
                                            placeholderTextColor={"black"}
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setUsername(text);
                                            }}
                                            value={value}
                                            autoCapitalize="none"
                                        />
                                    </Input>
                                    {errors.username && (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.username.message}</Text>
                                        </FormControlHelper>
                                    )}
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
                                    <Input borderColor='black'>
                                        <InputField
                                            placeholderTextColor={"black"}
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
                                    {errors.password && (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.password.message}</Text>
                                        </FormControlHelper>
                                    )}
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
                                    <Input borderColor='black'>
                                        <InputField
                                            placeholder="Repeat your password"
                                            placeholderTextColor={"black"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            secureTextEntry
                                        />
                                    </Input>
                                    {errors.repeatPassword && (
                                        <FormControlHelper>
                                            <Text color="$error600">{errors.repeatPassword.message}</Text>
                                        </FormControlHelper>
                                    )}
                                </FormControl>
                            )}
                            name="repeatPassword"
                        />

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            isDisabled={isLoading}
                            backgroundColor='#6A5650'
                            $hover-bgColor='#59453F'
                        >
                            <ButtonText color="$white" fontWeight="$bold">
                                {isLoading ? "Registering..." : "Register"}
                            </ButtonText>
                        </Button>

                        <Button onPress={onBackToSignIn} variant="outline" borderColor='black' $hover-bgColor='#6A5650'>
                            <ButtonText color='black'>Back to Sign In</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </ScrollView>
    )
}