import React from 'react'
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, useToast, Text, Link } from '@chakra-ui/react'

export default function signin() {

    const toast = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Login Successful",
            description: "You have logged in successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
                    Welcome to Caffeine Tracker!
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Enter your email" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter your password" />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" size="lg" w="full">
                            Sign In
                        </Button>
                    </Stack>
                </form>

                <Text mt={4} textAlign="center">
                    Don't have an account?{" "}
                    <Link color="blue.500">
                        Sign up
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}