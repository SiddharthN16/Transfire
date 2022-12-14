import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  CloseButton,
  Stack,
  Icon,
  Box,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../AuthContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async e => {
    e.preventDefault();

    try {
      await logOut();
      console.log(user);
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex>
      <Stack
        display={['none', 'none', 'flex', 'flex']}
        direction={'row'}
        mr={4}
        spacing={1}
      >
        {user ? (
          <>
            <Button variant="ghost" onClick={() => navigate('/myfiles')}>
              My Files
            </Button>
            <Button variant="ghost" onClick={() => navigate('/groups')}>
              Groups
            </Button>

            <Button
              colorScheme="messenger"
              onClick={handleLogout}
              rightIcon={<FiLogOut />}
            >
              Sign Out
              {''}
            </Button>
          </>
        ) : (
          <>
            <Button variant={'ghost'} onClick={() => navigate('/login')}>
              Sign In
            </Button>

            <Button variant={'ghost'} onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </>
        )}
      </Stack>

      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              variant="ghost"
              display={['flex', 'flex', 'none', 'none']}
            >
              {isOpen ? <CloseButton /> : <HamburgerIcon fontSize="xl" />}
            </MenuButton>
            <MenuList>
              {!user ? (
                <>
                  <MenuItem onClick={() => navigate('/login')}>
                    Sign In
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/signup')}>
                    Sign Up
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate('/myfiles')}>
                    My Files
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/groups')}>
                    Groups
                  </MenuItem>
                  <MenuItem as="button" onClick={handleLogout}>
                    <Box pr={2}>Sign Out</Box>
                    <FiLogOut />
                  </MenuItem>
                </>
              )}
            </MenuList>
          </>
        )}
      </Menu>
      <ColorModeSwitcher mr="4" />
    </Flex>
  );
};

export default Navbar;
