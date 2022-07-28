import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import image from '../assets/images/pexels-pixabay-48794.jpg';
// import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Link,
  VStack,
  InputRightElement,
  InputGroup,
  useBreakpointValue,
} from '@chakra-ui/react';

const Login = (props) => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { error }] = useMutation(LOGIN);

  const isInvalid = formState.password === '' || formState.email ==='';

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Flex
    w={'full'}
    h={'100vh'}
    backgroundImage={image}
    backgroundSize={'cover'}
    backgroundPosition={'center center'}>
    <VStack
      w={'full'}
      justify={'center'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      bgGradient={'linear(to-r, blackAlpha.800, transparent)'}>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color={'white'} fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'blackAlpha.700'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel color={'white'} htmlFor="email">Email address</FormLabel>
                <Input 
                  border={'none'}
                  bg={'whiteAlpha.400'}
                  color={'white'}
                  placeholder=""
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange} 
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>                
                <Input
                    border={'none'}
                    bg={'whiteAlpha.400'}
                    color={'white'}
                    isRequired
                    placeholder=""
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="pwd"
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      height="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
<<<<<<< HEAD
                  <Checkbox color={'white'}>Remember me</Checkbox>
                  <Link href="/signup" color={'#f07167ff'}>← Go to Signup</Link>
=======
                  <Checkbox>Remember me</Checkbox>
                  {/* //<Link href="/signup" color={'blue.400'}>← Go to Signup</Link> */}
>>>>>>> dashboard
                </Stack>
                {error ? (
                  <div>
                    <p className="error-text">The provided credentials are incorrect</p>
                  </div>
                ) : null}
                <Button
                  type="submit"
                  disabled={isInvalid}
                  bg={'#0081a7ff'}
                  color={'white'}
                  _hover={{
                    bg: '#00afb9ff',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
      </VStack>
    </Flex>
  );
};

export default Login;
