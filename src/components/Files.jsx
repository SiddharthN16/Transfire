import { Flex, Stack, Heading, Center, Container } from '@chakra-ui/react';
import Upload from './Upload';
import Card from './Card';

import { storage } from '../firebase';
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';
import { useAuth } from '../AuthContext';
import { useState } from 'react';

const Files = () => {
  const { user } = useAuth();

  // const getFileData = () => {
  //   listAll(ref(storage, `${user.uid}`))
  //     .then(res => {
  //       res.items.forEach(file => {
  //         getMetadata(file)
  //           .then(data => {
  //             getDownloadURL(ref(storage, data.fullPath))
  //               .then(url => {
  //                 return (
  //                   <>
  //                     <Card
  //                       fileName={data.name}
  //                       fileSize={data.size}
  //                       filePath={data.fullPath}
  //                       fileURL={url}
  //                     />
  //                   </>
  //                 );
  //               })
  //               .catch(err => {
  //                 console.log(err);
  //               });
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  return (
    <Stack direction={'column'}>
      <Center mt={8}>
        <Heading size={['xl', 'xl', 'xl', '2xl']}>Upload Files</Heading>
      </Center>
      <Upload />
      <Center>
        <Heading mt={4} size={['2xl', '2xl', '2xl', '3xl']}>
          My Files
        </Heading>
      </Center>

      <Center>
        <Container
          maxW={['sm', 'lg', '2xl', 'container.xl']}
          // bg="green.400"
        >
          <Card fileName={'File 1'} fileSize="2.3 MB" />
          <Card fileName={'File 2'} fileSize="1.2 MB" />
        </Container>
      </Center>
    </Stack>
  );
};

export default Files;
