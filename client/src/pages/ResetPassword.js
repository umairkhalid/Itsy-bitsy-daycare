import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {RESET_CODE} from  '../utils/mutations';
import validate from "../utils/validate";

const ResetPassword  = (props) =>{
    const [formState, setFormState] = useState({});

    const [resetPassword, { error }] = useMutation(RESET_CODE);

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
    console.log(formState.email);
    if(formState.newpassword===formState.confirmpassword)
    {
      console.log("nice")
    }
    else{
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
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
    <form 
    onSubmit={handleFormSubmit}
    validate={validate}
    >
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
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            type="email"
          />
        </FormControl>
        <FormControl id="newpassword" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password"
           name="newpassword"
           placeholder="New Password"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password"
           name="confirmpassword"
           placeholder="Confirm New Password"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <FormControl id="resetcode" isRequired>
          <FormLabel>Reset Code</FormLabel>
          <Input type="text"
           name="resetcode"
           placeholder="Reset Code"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
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
            Submit
          </Button>
        </Stack>
      </Stack>
      </form>
    </Flex>
  );
}

export default ResetPassword;