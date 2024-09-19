import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useToast, Text, Link, FormErrorMessage } from '@chakra-ui/react'

export default function Register() {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (password !== repeatPassword) {
            newErrors.password = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            toast({
                title: "Registration Successful",
                description: "Your account has been created successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="gray.50"
            p={4}
        >
            <Box
                w="full"
                maxW="md"
                p={8}
                borderWidth={1}
                borderRadius="lg"
                bg="white"
                boxShadow="lg"
            >
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    Register for Caffeine Tracker
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>

                        <FormControl isRequired isInvalid={!!errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="Enter your username" />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.password}>
                            <FormLabel>Repeat Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Repeat your password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" colorScheme="blue" size="lg" w="full">
                            Register
                        </Button>
                    </Stack>
                </form>

                <Text mt={4} textAlign="center">
                    Already have an account?{" "}
                    <Link color="blue.500">
                        Sign in
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}