import {
  chakra,
  Box,
  Button,
  Stack,
  Image,
  Text,
  Icon,
} from '@chakra-ui/react';

import demo from '../assets/Transfire_Demo.png';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async e => {
    e.preventDefault();

    try {
      await logOut();
      console.log(user);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box px={8} py={24} mx="auto">
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: 'left', md: 'center' }}
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color="gray.900"
          _dark={{ color: 'gray.100' }}
        >
          Welcome to Transfire
          {/* <Text
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            {user
              ? user.displayName
                ? `${user.displayName}`
                : `${user.email}`
              : 'NO USER'}
          </Text>{' '} */}
          {/* in one single place. */}
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color="gray.600"
          _dark={{ color: 'gray.300' }}
        >
          Transfire is a quick and simple way to transfer files between devices
          or sharing files with friends. Transfire is a lightweight tool to make
          quick file transfers, NOT to permanently store files.
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: 'left', md: 'center' }}
        >
          <Button
            variant="solid"
            colorScheme="purple"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: 'full', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            size="lg"
            cursor="pointer"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Get Started
          </Button>
        </Stack>
      </Box>
      <Box
        w={{ base: 'full', md: 10 / 12 }}
        mx="auto"
        mt={20}
        textAlign="center"
      >
        <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          src={demo}
          alt="Transfire Demo Screenshot"
        />
      </Box>
    </Box>
  );
};

export default Home;
