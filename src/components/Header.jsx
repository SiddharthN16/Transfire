import { Flex, Spacer, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from './Navbar';
const Header = () => {
  return (
    <Flex mt={4}>
      <Heading size="2xl" ml="4">
        <Link as={RouterLink} to="/" textDecor={'none'}>
          Transfire
        </Link>
      </Heading>
      <Spacer />
      <Navbar />
    </Flex>
  );
};

export default Header;
