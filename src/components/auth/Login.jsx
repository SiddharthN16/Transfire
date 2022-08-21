import {
  Flex,
  Link,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';

import { GoogleIcon } from '../Icons';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { logIn, googleSignIn, user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const showError = err => {
    toast({
      title: `${err}`,
      position: 'top-right',
      isClosable: true,
      status: 'error',
      duration: '2500',
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await logIn(email, password);
      console.log(user);
      navigate('/');
    } catch (error) {
      showError(error.message);
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSubmit = async e => {
    e.preventDefault();

    try {
      await googleSignIn();
      console.log(user);
      navigate('/');
    } catch (error) {
      showError(error.message);
      console.log(error.message);
    }
  };

  const isEmpty = e => {
    if (email === '' || password === '') {
      e.preventDefault();
      showError('Please Fill Out All Fields');
    }
  };

  const ifUser = () => {
    if (user) {
      return <Navigate to={'/'} replace={true} />;
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      {ifUser()}
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign In</Heading>
        </Stack>
        <Center>
          <Box
            w={['xs', 'lg']}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      onChange={e => setPassword(e.currentTarget.value)}
                      minLength={8}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  {/* <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack> */}

                  <Button
                    isLoading={loading}
                    loadingText="Signing in"
                    size={'lg'}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                    type="submit"
                    onClick={isEmpty}
                  >
                    Sign in
                  </Button>
                </Stack>

                <Stack pt={2}>
                  <Text align={'center'}>
                    Don't have an account?{' '}
                    <Link as={RouterLink} to="/signup" color={'blue.400'}>
                      Signup
                    </Link>
                  </Text>
                  <HStack>
                    <Divider />
                    <Text
                      fontSize="sm"
                      whiteSpace="nowrap"
                      color={useColorModeValue('gray.400', 'gray.500')}
                    >
                      OR
                    </Text>
                    <Divider />
                  </HStack>
                  <Center py={2}>
                    <Button
                      w={'full'}
                      maxW={'md'}
                      variant={'outline'}
                      leftIcon={<GoogleIcon />}
                      onClick={handleGoogleSubmit}
                    >
                      <Center>
                        <Text>Continue with Google</Text>
                      </Center>
                    </Button>
                  </Center>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Center>
      </Stack>
    </Flex>
  );
};

export default Login;
