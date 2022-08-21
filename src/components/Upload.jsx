import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Center,
  Flex,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';

const Upload = ({ onFileAccepted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDrop = useCallback(
    acceptedFiles => {
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.jpg',
    maxFiles: 1,
    multiple: false,
  });

  const dropText = isDragActive
    ? 'Drop Files Here'
    : 'Drag & Drop Files to Upload';

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500'
  );

  return (
    <Flex>
      <Button onClick={onOpen}>Upload File</Button>

      <Modal
        isOpen={isOpen}
        size={'5xl'}
        onClose={onClose}
        rounded={10}
        isCentered
      >
        <ModalOverlay />

        <ModalContent bg={'red.200'} p={6}>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <Center
            h={[300, 450, 500, 600]}
            bg={isDragActive ? activeBg : 'gray.50'}
            rounded={10}
            boxShadow={'lg'}
            _hover={{ bg: activeBg }}
            border="3px dashed"
            transition="background-color 0.2s ease"
            borderRadius={4}
            borderColor={borderColor}
          >
            <Stack direction={'column'}>
              <Heading color={'black'}>{dropText}</Heading>
              <Center>
                <Text>{!isDragActive && 'Or Browse Files'}</Text>
              </Center>
            </Stack>
          </Center>
          {/* <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Test</ModalBody>

          <ModalFooter>
            <Center>
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Upload
              </Button>
            </Center>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Upload;

// <Center
// p={10}
// cursor="pointer"
// bg={isDragActive ? activeBg : 'transparent'}
// _hover={{ bg: activeBg }}
// transition="background-color 0.2s ease"
// borderRadius={4}
// border="3px dashed"
// borderColor={borderColor}
// {...getRootProps()}
// >
// <input {...getInputProps()} />
// <Icon as={AiFillFileAdd} mr={2} />
// <p>{dropText}</p>
// </Center>
