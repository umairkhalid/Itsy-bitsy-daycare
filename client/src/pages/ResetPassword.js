import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  use,
  FormErrorMessage
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {UPDATE_PASSWORD} from  '../utils/mutations';

const ResetPassword  = (props) =>{
    const [formState, setFormState] = useState({});
    const [returnMessage, setReturnMessage] = useState();
    const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD);
    const { isOpen, onOpen, onClose , m} = useDisclosure()
    let mutationResponse;

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if(formState.newpassword===formState.confirmpassword)
    {
      console.log("nice")
      mutationResponse = await updatePassword({
        variables: { email: formState.email, 
                  resetCode: formState.resetcode, 
                  password: formState.newpassword },
      });
      console.log("Mutation response" ,mutationResponse.data.updatePassword);
      // open modal here
      
      if (!mutationResponse.data.updatePassword)
      {
        setReturnMessage("Invalid Code");
        return;
      }
      setReturnMessage("Password changed");
      onOpen();
    }
    else{
      
      setReturnMessage("Password not matching");

      return;
    }
    
    try {
      
      
    } catch (e) {
      console.log("Error",e);
    }

    
  };

  const handleClose= async (event) =>{
    window.location.replace('/login');
  }

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
      bg={useColorModeValue('gray.50', 'gray.800')}>
    <form 
      onSubmit={handleFormSubmit}
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

          <FormLabel >Check your email for code.  </FormLabel>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
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
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: '#00afb9ff',
          }}>
          Submit
          </Button>
          {/* <DialogModal /> */}
          <FormLabel
          color={'red'}>{returnMessage}</FormLabel>
        </Stack>
      </Stack>
      
      
      <Modal isOpen={isOpen} onClose={handleClose} props={mutationResponse} >
          <ModalOverlay />
          <ModalContent  >
            <ModalHeader>Password Changed</ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
              Password changed successfully, please use new details to login.
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </Flex>
    
  );
}

export default ResetPassword;