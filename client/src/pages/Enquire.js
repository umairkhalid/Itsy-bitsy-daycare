import React, { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ENQUIRY } from '../utils/mutations';
import image from '../assets/images/pexels-pixabay-48794.jpg';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Checkbox,
    CheckboxGroup,
    VStack,
    Stack,
    Button,
    Select,
    Heading,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';

import { useQuery } from '@apollo/client';
import { BRANCHES } from '../utils/queries';
import { removeConnectionDirectiveFromDocument } from '@apollo/client/utilities';


  const Enquiry = () => {
    const [formState, setFormState] = useState({ lastName: '', email: ''});
    const [addEnquiry, {mdata, mloading, error}] = useMutation(ENQUIRY);
    
    const isInvalid = formState.lastName === '' || formState.email ==='';

    const { loading, data } = useQuery(BRANCHES);
    const branches = data?.allBranches || [];
    //console.log(branches);
    
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      
      const var2 = { "firstName": formState.firstName,
      "lastName": formState.lastName,
      "addressLine1": formState.address1,
      "addressLine2": formState.address2,
      "suburb": formState.suburb,
      "state": formState.state,
      "postCode": formState.postcode,
      "email": formState.email,
      "phone": formState.phone,
      "childFirstName": formState.cfirstName,
      "childLastName": formState.clastName,
      "childDateOfBirth": "2013/01/01",
      "requestedDays": formState.reqdays,
      "branch": formState.branch,
      "branchRoom": formState.branchRoom
    }
    console.log("var" , var2);
    
      try{
        const mutationResponse = await addEnquiry({
          variables: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            addressLine1: formState.address1,
            addressLine2: formState.address2,
            suburb: formState.suburb,
            state: formState.state,
            postCode: formState.postcode,
            email: formState.email,
            phone: formState.phone,
            childFirstName: formState.cfirstName,
            childLastName: formState.clastName,
            childDateOfBirth: "2013/01/01",
            requestedDays: formState.reqdays,
            branch: formState.branch,
            branchRoom: formState.branchRoom,
          },
        });
        console.log(mutationResponse);
      }
      catch (error)
      {
          console.log("Erro",error);
      }
      
      // const token = mutationResponse.data.addUser.token;
      // Auth.login(token);
    };

  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleChangeDays = (event) => {
      setFormState({
        ...formState,
        ["reqdays"]: event,
      });
    }

    const [selectValue, setSelectValue] = useState(null); 
    
    const options = useMemo(() => {

      if (selectValue){
        if (selectValue.target.value=="NONE")
        {
          console.log("Please select a branch");
          return([]);
        }
        else{
          const branchRooms = branches.filter(branch => branch._id==selectValue.target.value);
          let rm=[];
          const rooms = [branchRooms.map((m)=>{ 
              m.branchRoom.forEach(p => {
                rm.push({
                  value: p._id,
                  label: p.roomName
                })
              })
              
          })];

          //setting branch in state 
          setFormState({
            ...formState,
            ["branch"]: selectValue.target.value,
          });
          return rm;
      }}
      else
        {
          console.log("Empty")
        }
      return ([]) // update pointer
   }, [selectValue]) // rerun function in useMemo on selectValue changes
  
    return (
      <form onSubmit={handleFormSubmit}>
        <Flex
          w={'full'}
          // h={'100vh'}
          backgroundImage={image}
          backgroundSize={'cover'}
          backgroundPosition={'center center'}>
          <VStack
            w={'full'}
            justify={'center'}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={'linear(to-r, blackAlpha.800, transparent)'}>
            <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={2}>
              <Stack align={'center'}>
                <Heading color={'white'} fontSize={'4xl'} textAlign={'center'}>
                  Enquiry Form 
                </Heading>
                <Text fontSize={'lg'} color={'white'}>
                  Fill up the following form to request the access
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={'blackAlpha.700'}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <HStack spacing={10}>
                    <Box>
                      <FormControl id="firstName" width={"18rem"} isRequired>
                        <FormLabel color={'white'}>First Name</FormLabel>
                        <Input
                          border={'none'}
                          bg={'whiteAlpha.400'}
                          color={'white'}
                          placeholder=""
                          name="firstName"
                          type="firstName"
                          id="firstName"
                          
                          onChange={handleChange} 
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName" width={"18rem"} isRequired>
                        <FormLabel color={'white'}>Last Name</FormLabel>
                        <Input 
                          border={'none'}
                          bg={'whiteAlpha.400'}
                          color={'white'}
                          placeholder=""
                          name="lastName"
                          type="lastName"
                          id="lastName"
                          value={formState.lastName}
                          onChange={handleChange}  
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="address1" isRequired>
                    <FormLabel color={'white'}>Address</FormLabel>
                    <Input 
                      border={'none'}
                      bg={'whiteAlpha.400'}
                      color={'white'}
                      placeholder=""
                      name="address1"
                      type="address1"
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="address2">
                    <Input 
                      border={'none'}
                      bg={'whiteAlpha.400'}
                      color={'white'}
                      placeholder=""
                      name="address2"
                      type="address2"
                      onChange={handleChange}
                    />
                  </FormControl>
                  <HStack>
                    <FormControl id="suburb" isRequired>
                      <FormLabel color={'white'}>Suburb</FormLabel>
                      <Input 
                        border={'none'}
                        bg={'whiteAlpha.400'}
                        color={'white'}
                        placeholder=""
                        name="suburb"
                        type="suburb"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Box>
                      <FormControl id="state" width={"10rem"} isRequired>
                        <FormLabel color={'white'}>State</FormLabel>
                        <Select
                          name="state"
                          border={'none'}
                          bg={'whiteAlpha.600'}
                          color={'black'}
                          placeholder=""
                          onChange={handleChange}
                        >
                          <option value='act'>ACT</option>
                          <option value='nsw'>NSW</option>
                          <option value='nt'>NT</option>
                          <option value='qld'>QLD</option>
                          <option value='tas'>TAS</option>
                          <option value='vic'>VIC</option>
                          <option value='wa'>WA</option>
                        </Select>
                      </FormControl>
                    </Box>
                    <FormControl id="postcode" width={"12rem"} isRequired>
                      <FormLabel color={'white'}>Post Code</FormLabel>
                      <Input
                        border={'none'}
                        bg={'whiteAlpha.400'}
                        color={'white'}
                        placeholder=""
                        name="postcode"
                        type="postcode"
                        onChange={handleChange}
                      />
                      </FormControl>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel color={'white'}>Email</FormLabel>
                    <Input
                      border={'none'}
                      bg={'whiteAlpha.400'}
                      color={'white'}
                      placeholder=""
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="phone" isRequired>
                    <FormLabel color={'white'}>Phone</FormLabel>
                    <Input
                      border={'none'}
                      bg={'whiteAlpha.400'}
                      color={'white'}
                      placeholder=""
                      name="phone"
                      type="phone"
                      onChange={handleChange}
                    />
                  </FormControl>
                  <HStack spacing={10}>
                    <Box>
                      <FormControl id="cfirstName" width={"18rem"} isRequired> 
                        <FormLabel color={'white'}>Child's First Name</FormLabel>
                        <Input
                          border={'none'}
                          bg={'whiteAlpha.400'}
                          color={'white'}
                          placeholder=""
                          name="cfirstName"
                          type="cfirstName"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="clastName" width={"18rem"} isRequired>
                        <FormLabel color={'white'}>Child's Last Name</FormLabel>
                        <Input
                          border={'none'}
                          bg={'whiteAlpha.400'}
                          color={'white'}
                          placeholder=""
                          name="clastName"
                          type="clastName"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <HStack spacing={12}>
                    <Box>
                      <FormControl id="dob" isRequired>
                        <FormLabel color={'white'}>Child's Date of Birth</FormLabel>
                        <Input
                          border={'none'}
                          bg={'whiteAlpha.600'}
                          color={'black'}
                          placeholder=""
                          name="dob"
                          type="date"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="reqdays">
                        <FormLabel color={'white'}>Days Requested</FormLabel>
                        {/*<Select
                          border={'none'}
                          bg={'whiteAlpha.600'}
                          color={'black'}
                          placeholder=""
                          name="reqdays"
                          type="reqdays"
                          onChange={handleChange}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                        </Select>
                       */}
                      <CheckboxGroup name="checkdays" colorScheme='green' onChange={handleChangeDays} >
                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                          <Checkbox color={'white'} value='Mon'>Mon</Checkbox>
                          <Checkbox color={'white'} value='Tues'>Tues</Checkbox>
                          <Checkbox color={'white'} value='Wed'>Wed</Checkbox>
                          <Checkbox color={'white'} value='Thur'>Thur</Checkbox>
                          <Checkbox color={'white'} value='Fri'>Fri</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                      </FormControl>
                    </Box>
                  </HStack>
                  <HStack spacing={20}>
                    <Box>
                    <FormControl id="branch" isRequired >
                        <FormLabel color={'white'}>Branch Location</FormLabel>
                        <Select
                          border={'none'}
                          bg={'whiteAlpha.600'}
                          color={'black'}
                          placeholder=""
                          name="branch"
                          type="branch"
                          //onChange={handleBranchChange}
                          onChange={value => setSelectValue(value)}
                        >
                          <option key="NONE" value="NONE">Select Branch</option>
                          {branches.map((m) => (
                            <option key={m._id} value={m._id}>{m.branchName} </option>
                          ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="branchRoom" isRequired >
                        <FormLabel color={'white'}>Room</FormLabel>
                        <Select
                          border={'none'}
                          bg={'whiteAlpha.600'}
                          color={'black'}
                          placeholder=""
                          name="branchRoom"
                          type="branchRoom"
                          onChange={handleChange}
                          // option={options}
                        >
                          <option key="NONE" value="NONE">Select Room</option>
                          {options.map((m) => (
                            <option value={m.value}>{m.label} </option>
                          ))
                          }
                          {/* <option>Preliminary</option>
                          <option>Kindy</option> */}
                        </Select>
                      </FormControl>
                    </Box>
                  </HStack>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type='submit'
                      disabled={isInvalid}
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}>
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </VStack>
        </Flex>
      </form>
    );
  };

  export default Enquiry;