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

import { firestore, storage } from '../firebase';
import { ref, deleteObject, getBlob } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';

const Card = ({ fileName, fileSize, filePath, fileURL, fileType }) => {
  const [delLoad, setDelLoad] = useState(false);
  const [downLoad, setDownLoad] = useState(false);

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
    setDelLoad(true);

    const fileRef = ref(storage, filePath);
    const docRef = doc(firestore, filePath);

    try {
      await deleteObject(fileRef);
      await deleteDoc(docRef);

      setDelLoad(false);
      showToast('success', 'File Deleted');
    } catch (err) {
      showToast('error', err.code);
      setDelLoad(false);
    }
  };

  const handleDownload = () => {
    setDownLoad(true);
    getBlob(ref(storage, filePath))
      .then(blob => {
        const file = document.createElement('a');
        file.href = window.URL.createObjectURL(blob);
        file.download = fileName;
        file.style.display = 'none';
        document.body.appendChild(file);
        file.click();
        setDownLoad(false);
      })
      .catch(err => {
        console.log(err);
        setDownLoad(false);
      });
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
              <Text fontSize={[12, 14, 16, 18]} ml={[2, '0']}>
                {fileSize} B
              </Text>
            </Flex>
            <Flex
              w={'40%'}
              align={'center'}
              display={['none', 'none', 'flex', 'flex']}
            >
              <Text fontSize={[12, 14, 16, 18]}>{fileType}</Text>
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
                <IconButton
                  colorScheme="blue"
                  onClick={handleDownload}
                  icon={<IoDownloadOutline />}
                  isLoading={downLoad}
                />
                <IconButton
                  colorScheme="red"
                  icon={<IoTrashOutline />}
                  onClick={handleDelete}
                  isLoading={delLoad}
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
                    onClick={handleDownload}
                    isLoading={downLoad}
                    loadingText="Downloading"
                  >
                    Download
                  </Button>
                  <Button
                    w={'100%'}
                    mb={2}
                    colorScheme="red"
                    leftIcon={<IoTrashOutline />}
                    onClick={handleDelete}
                    isLoading={delLoad}
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
