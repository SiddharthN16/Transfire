import React from 'react';
import {
  chakra,
  Box,
  Button,
  Stack,
  Image,
  Text,
  Icon,
} from '@chakra-ui/react';

const Test = () => {
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
          Hi I'm{' '}
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            // fontWeight="extrabold"
          >
            Siddharth Nema
          </Text>{' '}
          👋
        </chakra.h1>
      </Box>
    </Box>
  );
};

export default Test;
