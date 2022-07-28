import { ReactNode } from 'react';
import image from '../assets/images/pexels-pixabay-220455.jpg';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export default function StatsGridWithImage() {
  return (
    <Box id='whyus' pl={{base: 0, md: 10}} bg={"gray.800"} position={"relative"}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        backgroundImage={image}
        backgroundSize={"cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position={"absolute"}
        width={"100%"}
        insetY={0}
        right={0}
      >
        <Flex
          bgGradient={"linear(to-r, gray.800 30%, transparent)"}
          w={"full"}
          h={"full"}
        />
      </Flex>
      <Container align={'left'} maxW={"7xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"gray.400"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={{ base: "xl", md: "2xl" }}
                color={"#f07167ff"}
              >
                WHY CHOOSE US?
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                It is our place where we all belong.
              </Heading>
              <Text fontSize={"xl"} color={"#00afb9ff"}>
                At Itsy Bitsy, children find their voice. From their very first visit,
                until they transition to school, our children discover their
                sense of self and learn to respect others. Curious and social,
                they’re ready for the world. They’re happy with who they are,
                and interested in who you are. No matter how big the
                conversation, they have their say. Throughout various services,
                children experience high quality early education preschool,
                child care, early intervention and inclusion programs, and small
                acts of kindness happen every day. They learn it’s OK to be
                different, and we can all be different, together.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    color={"white"}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={'span'} fontWeight={700} color={'#fed9b7ff'}>
    {children}
  </Text>
);

const stats = [
  {
    title: '128+',
    content: (
      <>
        <StatsText>Services</StatsText> provided early education and care services directly to children and families.
      </>
    ),
  },
  {
    title: '5,030',
    content: (
      <>
        <StatsText>Members</StatsText> formed the foundational basis of our constitutional and governance status.
      </>
    ),
  },
  {
    title: '185+',
    content: (
      <>
        <StatsText>Professional</StatsText> learning sessions were delivered for educators and staff nationally.
      </>
    ),
  },
  {
    title: '680+',
    content: (
      <>
        <StatsText>Children</StatsText> with additional needs were included in services assisted by our Education Support Team.
      </>
    ),
  },
];