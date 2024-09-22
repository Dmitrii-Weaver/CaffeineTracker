import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
    ButtonGroup,
} from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { useToast, Toast } from '@/components/ui/toast';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';

/* import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,  
    useToast,
    Text,
    Link,
    FormErrorMessage,
} from '@chakra-ui/react'; */



export default function Register() {
    /* const toast = useToast(); */
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
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
            Toast({
                /* title: 'Registration Successful', */
                /* description: 'Your account has been created successfully!', */
                /* status: 'success', */
                /*  duration: 3000, */
                /* isClosable: true, */
            });
        }
    };

    return (
        <Box
        /* minH="100vh" */
        /* display="flex" */
        /* justifyContent="center" */
        /* alignItems="center" */
        /* bg="gray.50" */
        /* p={4} */
        /* overflowY="auto" */
        >
            <Box
            /* w="full" */
            /* maxW="md" */
            /* p={8} */
            /* borderWidth={2} */
            /* borderRadius="lg" */
            /* bg="white" */
            /* boxShadow="lg" */
            /* mb={8} */
            >
                <Heading size={'lg'}>
                    Register for Caffeine Tracker
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack /* spacing={4} */>
                        <FormControl isRequired isInvalid={!!errors.email}>
                            <FormControlLabel>
                                <FormControlLabelText>Email</FormControlLabelText>
                            </FormControlLabel>
                            <Input
                            /*  type="email" */
                            /* placeholder="Enter your email" */
                            /* value={email} */
                            /* onChange={(e) => setEmail(e.target.value)} */
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControlLabel>
                                <FormControlLabelText>Username</FormControlLabelText>
                            </FormControlLabel>
                            <Input /* type="text" */ /* placeholder="Enter your username" */ />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.password}>
                            <FormControlLabel>
                                <FormControlLabelText>Password</FormControlLabelText>
                            </FormControlLabel>
                            <Input
                            /* type="password" */
                            /* placeholder="Enter your password" */
                            /* value={password} */
                            /* onChange={(e) => setPassword(e.target.value)} */
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.password}>
                            <FormControlLabel>
                                <FormControlLabelText>Repeat</FormControlLabelText>
                            </FormControlLabel>
                            <Input
                            /* type="password" */
                            /* placeholder="Repeat your password" */
                            /* value={repeatPassword} */
                            /* onChange={(e) => setRepeatPassword(e.target.value)} */
                            />
                            <FormControlError>
                                <FormControlErrorText>{errors.password}</FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <Button /* type="submit" */ /* colorScheme="blue" */ /* size="lg" */ /* w="full" */>
                            Register
                        </Button>
                    </VStack>
                </form>

                <Text /* mt={4} */ /* textAlign="center" */>
                    Already have an account?{' '}
                    <Link /* color="blue.500" */>
                        Sign in
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}
