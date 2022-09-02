import { Flex, Stack, Heading, Center, Text } from '@chakra-ui/react';
import PersonalUpload from './PersonalUpload';
import FileCard from './FileCard';

import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';

import { firestore } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Files = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState();

  useEffect(() => {
    const dataQuery = query(collection(firestore, user.uid));

    const unsubscribe = onSnapshot(dataQuery, snapshot => {
      setCards(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <Stack direction={'column'}>
      <Center mt={8}>
        <Heading size={['xl', 'xl', 'xl', '2xl']}>Upload Files</Heading>
      </Center>
      <PersonalUpload />
      <Center>
        <Heading mt={4} size={['2xl', '2xl', '2xl', '3xl']}>
          My Files
        </Heading>
      </Center>

      <Center>
        <Stack maxW={['sm', 'lg', 'xl', 'container.lg', 'container.xl']}>
          <Flex w={['sm', 'lg', '2xl', 'container.xl']}>
            <Flex w={['51%', '33%', '', '', '38.5%']}>
              <Text ml={4}>Name</Text>
            </Flex>
            <Flex w={['22.5%', '19%', '', '22.5%']}>
              <Text ml={4}>Size</Text>
            </Flex>
            <Flex display={['none', 'none', 'flex', 'flex']}>
              <Text ml={4}>Type</Text>
            </Flex>
          </Flex>

          {cards?.map(data => (
            <FileCard
              fileName={data.fileName}
              fileSize={data.fileSize}
              filePath={data.filePath}
              fileURL={data.fileURL}
              fileType={data.fileType}
              key={data.id}
            />
          ))}
        </Stack>
      </Center>
    </Stack>
  );
};

export default Files;
