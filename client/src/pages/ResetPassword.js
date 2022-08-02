import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {RESET_CODE} from  '../utils/mutations';
import validate from "../utils/validate";
import image from '../assets/images/pexels-pixabay-48794.jpg';

const ResetPassword  = (props) =>{
    const [formState, setFormState] = useState({email: ''});
    const [isLoading, setIsLoading] = useState(false);

    const [resetPassword, { error }] = useMutation(RESET_CODE);

    const isInvalid = formState.email === '';

    const handleChange = (event) => {
      const { name, value } = event.target;
      console.log(event);
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(formState.email);
    if(formState.newpassword===formState.confirmpassword)
    {
      console.log("nice")
    }
    else{
      setIsLoading(false);
      console.log("Password not matching");
      return;
    }
    // try {
    //   const mutationResponse = await resetPassword({
    //     variables: { email: formState.email },
    //   });
    //   console.log(mutationResponse);
    // } catch (e) {
    //   console.log(error);
    // }
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
      <form 
      onSubmit={handleFormSubmit}
      validate={validate}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={'blackAlpha.700'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading color={'white'} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel color={'white'}>Email address</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            type="email"
          />
        </FormControl>
        <FormControl id="newpassword" isRequired>
          <FormLabel color={'white'}>Password</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            type="password"
            name="newpassword"
            placeholder="New Password"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
          <FormLabel color={'white'}>Confirm Password</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            type="password"
            name="confirmpassword"
            placeholder="Confirm New Password"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <FormControl id="resetcode" isRequired>
          <FormLabel color={'white'}>Reset Code</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            type="text"
            name="resetcode"
            placeholder="Reset Code"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <Stack spacing={6}>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isInvalid}
            bg={'#0081a7ff'}
            color={'white'}
            _hover={{
              bg: '#00afb9ff',
          }}>
          Submit
          </Button>
        </Stack>
      </Stack>
      </form>
    </VStack>
    </Flex>
  );
}

export default ResetPassword;