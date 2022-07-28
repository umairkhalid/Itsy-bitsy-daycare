import image from '../assets/images/pexels-josh-willink-701014.jpg';
import Type from './Type';
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  export default function WithBackgroundImage() {
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
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'#f07167ff'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '2xl', md: '2xl' })}>
            <Type />
            </Text>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              Positively contributing to the foundations of
              each child's lifelong learning
            </Text>
            <Stack direction={'row'}>
              <Button
                bg={'#0081a7ff'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: '#f07167ff' }}>
                Get started
              </Button>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: '#fed9b7ff', color: 'black' }}>
                Show me more
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  }