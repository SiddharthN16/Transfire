import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../AuthContext';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp, user, updateName } = useAuth();
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

    if (password !== confPassword) {
      return showError('Passwords Do Not Match');
    }

    try {
      setLoading(true);
      await signUp(email, password);
      console.log(user);
    } catch (error) {
      showError(error.message);
      console.log(error.message);
    }
    setLoading(false);
    try {
      updateName(name);
      navigate('/login');
    } catch (error) {
      showError(error.message);
      console.log(error.message);
    }
  };

  const isEmpty = e => {
    if (name === '' || email === '' || password === '') {
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
      {/* {ifUser()} */}

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text> */}
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
                <FormControl id="firstName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    onChange={e => setName(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={e => setEmail(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
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

                <FormControl id="confPassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfPassword ? 'text' : 'password'}
                      onChange={e => setConfPassword(e.currentTarget.value)}
                      minLength={8}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowConfPassword(
                            showConfPassword => !showConfPassword
                          )
                        }
                      >
                        {showConfPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                    type="submit"
                    onClick={isEmpty}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={2}>
                  <Text align={'center'}>
                    Already a user?{' '}
                    <Link as={RouterLink} to="/login" color={'blue.400'}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Center>
      </Stack>
    </Flex>
  );
};

export default Signup;
