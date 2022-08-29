import {
  Box,
  Flex,
  Stack,
  Center,
  Heading,
  Text,
  VStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  IoOpenOutline,
  IoDownloadOutline,
  IoTrashOutline,
} from 'react-icons/io5';

const Card = ({ fileName, fileSize, filePath, fileURL }) => {
  return (
    <Flex mt={2} mb={4}>
      <Box
        bg={useColorModeValue('blue.50', 'blue.800')}
        w={['sm', 'lg', '2xl', 'container.xl']}
        borderRadius={10}
      >
        <Box p={4}>
          <Stack direction={'row'}>
            <Flex w={'70%'} bg="tomato" align={'center'}>
              {fileName}
            </Flex>
            <Flex w={'40%'} bg="orange" align={'center'}>
              {fileSize}
            </Flex>
            <Flex w={'5%'}>
              <IconButton colorScheme="teal" icon={<IoOpenOutline />} />
            </Flex>
            <Flex w={'5%'}>
              <IconButton colorScheme="blue" icon={<IoDownloadOutline />} />
            </Flex>
            <Flex w={'5%'}>
              <IconButton colorScheme="red" icon={<IoTrashOutline />} />
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Card;
