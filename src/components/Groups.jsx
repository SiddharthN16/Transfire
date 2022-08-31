import {
  Flex,
  Box,
  Stack,
  Center,
  Container,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';

import { firestore, db, storage } from '../firebase';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { set, ref, push, update, child } from 'firebase/database';
import { useAuth } from '../AuthContext';

const Groups = () => {
  const { user } = useAuth();
  const [code, setCode] = useState('');

  const handleCreate = () => {
    const groupCode = uuid();
    const groupRef = ref(db, `groups/${groupCode}`);
    set(groupRef, {
      users: [user.uid],
    });
    setCode(groupCode);

    const userGroupsRef = ref(db, `users/${user.uid}`);
    set(userGroupsRef, {
      groups: [groupCode],
    });
  };

  return (
    <Stack direction={'column'}>
      <Center>
        <Button onClick={handleCreate}>Create Group</Button>
        <Text>{code}</Text>
      </Center>
      <Center>
        <Button>Join Group</Button>
      </Center>
    </Stack>
  );
};

export default Groups;
