import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue, Box, Link } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';
import { HelpBox } from 'components/help-box';

function HomePage() {
  return (
    <>
      <Head>
        <title>{`JANAVAANI JANASENA`}</title>

        <meta
          name="description"
          content="Empower Your Voice with Janavaani Janasena: Uncovering the Issues and Grievances of Andhra Pradesh Constituencies, Connecting People to Party Chief Mr. Pawan Kalyan"
        />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack position="relative" spacing={6} w={'full'} maxW={'lg'}>
            <HelpBox />
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                {`JANAVAANI JANASENA`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {`Empower Your Voice with Janavaani Janasena: Uncovering the Issues and Grievances of Andhra Pradesh Constituencies, Connecting People to Party Chief Mr. Pawan Kalyan`}
            </Text>
            <Stack direction="column" spacing={4} className="roles-container">
              <Text>Jana Sena</Text>
              <Stack className="owner-roles-container" direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  rounded={'full'}
                  bg={'cyan.500'}
                  color={'white'}
                  _hover={{
                    bg: 'cyan.700',
                  }}
                  onClick={() => signUp('party-chief')}
                >
                  Create Account
                </Button>
                <Button rounded={'full'} onClick={() => signIn('party-chief')}>
                  Login
                </Button>
              </Stack>

              <Text>Citizen Reporter</Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  rounded={'full'}
                  bg={'cyan.500'}
                  color={'white'}
                  _hover={{
                    bg: 'cyan.700',
                  }}
                  onClick={() => signUp('citizen-reporter')}
                >
                  Register
                </Button>
                <Button rounded={'full'} onClick={() => signIn('citizen-reporter')}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
        <Flex position="relative" flex={1}>
          <Image
            src={
              'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjA3NjB8MHwxfHNlYXJjaHwxfHxBbmRocmElMjBQcmFkZXNoJTJDSmFuYXNlbmElMjBQYXJ0eXxlbnwwfHx8fDE2ODc1MzA0NzR8MA&ixlib=rb-4.0.3&q=80&w=1080'
            }
            alt={'Login Image'}
            objectFit={'cover'}
          />
          <Box position="absolute" top="0" backgroundColor="rgba(0,0,0,0.6)" width="100%" py="2">
            <Text align="center" fontSize="sm" color="white">
              Photo by{' '}
              <Link
                href="https://unsplash.com/de/@adigold1?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >{`Adi Goldstein`}</Link>{' '}
              on{' '}
              <Link
                href="https://unsplash.com/?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >
                Unsplash
              </Link>
            </Text>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
