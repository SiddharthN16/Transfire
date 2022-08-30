import {
  Box,
  Flex,
  Stack,
  Button,
  ButtonGroup,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Link,
} from '@chakra-ui/react';
import {
  IoOpenOutline,
  IoDownloadOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';

import { db, storage } from '../firebase';
import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';

const Card = ({ fileName, fileSize, filePath, fileURL }) => {
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const showToast = (type, err) => {
    toast({
      title: `${err}`,
      position: 'top-right',
      isClosable: true,
      status: `${type}`,
      duration: '2500',
    });
  };

  const handleDelete = async () => {
    setLoading(true);

    const fileRef = ref(storage, filePath);
    const docRef = doc(db, filePath);

    try {
      await deleteObject(fileRef);
      await deleteDoc(docRef);

      setLoading(false);
      showToast('success', 'File Deleted');
    } catch (err) {
      showToast('error', err.code);
      setLoading(false);
    }
  };

  return (
    <Flex mt={2} mb={4}>
      <Box
        bg={useColorModeValue('blue.200', 'blue.800')}
        w={['sm', 'lg', '2xl', 'container.xl']}
        borderRadius={16}
      >
        <Box p={4}>
          <Stack direction={'row'}>
            <Flex w={'60%'} align={'center'}>
              <Text as={'b'} fontSize={[12, 14, 16, 18]}>
                {fileName}
              </Text>
            </Flex>
            <Flex w={'35%'} align={'center'}>
              <Text as={'b'} fontSize={[12, 14, 16, 18]} ml={[2, '0']}>
                {fileSize}
              </Text>
            </Flex>
            <Flex
              w={'40%'}
              align={'center'}
              display={['none', 'none', 'flex', 'flex']}
            >
              <Text as={'b'} fontSize={[12, 14, 16, 18]}>
                {fileSize}
              </Text>
            </Flex>

            <Flex display={['none', 'none', 'flex', 'flex', 'flex']}>
              <ButtonGroup>
                <IconButton
                  as={Link}
                  href={fileURL}
                  colorScheme="teal"
                  icon={<IoOpenOutline />}
                  isExternal
                />
                <IconButton colorScheme="blue" icon={<IoDownloadOutline />} />
                <IconButton
                  colorScheme="red"
                  icon={<IoTrashOutline />}
                  onClick={handleDelete}
                  isLoading={loading}
                />
              </ButtonGroup>
            </Flex>

            <Flex align={'center'} px={2} display={['flex', 'flex', 'none']}>
              <Box mr={4}>
                <HiDotsHorizontal
                  as={Button}
                  cursor="pointer"
                  onClick={onOpen}
                />
              </Box>
            </Flex>

            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px" align="center">
                  {fileName}
                </DrawerHeader>
                <DrawerBody>
                  <Button
                    as={Link}
                    href={fileURL}
                    w={'100%'}
                    mb={2}
                    colorScheme="teal"
                    leftIcon={<IoOpenOutline />}
                    isExternal
                  >
                    Open
                  </Button>
                  <Button
                    w={'100%'}
                    mb={2}
                    colorScheme="blue"
                    leftIcon={<IoDownloadOutline />}
                  >
                    Download
                  </Button>
                  <Button
                    w={'100%'}
                    mb={2}
                    colorScheme="red"
                    leftIcon={<IoTrashOutline />}
                    onClick={handleDelete}
                    isLoading={loading}
                    loadingText="Deleting"
                  >
                    Delete
                  </Button>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Card;
