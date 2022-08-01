import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {RESET_CODE} from  '../utils/mutations';

  const Forget  = (props) =>{
    const [formState, setFormState] = useState({});

    const [resetPassword, { error }] = useMutation(RESET_CODE);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.email);
    try {
      const mutationResponse = await resetPassword({
        variables: { email: formState.email },
      });
      console.log(mutationResponse);
    } catch (e) {
      console.log(error);
    }
  };


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
      <form onSubmit={handleFormSubmit}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              name="email"
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              onChange={handleChange}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
              }}>
              Request Reset
            </Button>
          </Stack>
        </Stack>
        </form>
      </Flex>
    );
  }

  export default Forget;