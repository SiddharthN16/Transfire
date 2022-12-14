import {
  Flex,
  Box,
  Stack,
  Center,
  Heading,
  Text,
  Button,
  Input,
  useToast,
  Wrap,
  WrapItem,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useBoolean,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import { firestore, db, storage } from '../firebase';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { set, ref, push, update, child, get, onValue } from 'firebase/database';
import { useAuth } from '../AuthContext';
import GroupCard from './GroupCard';
import Test from './Test';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import Card from './FileCard';

const Groups = () => {
  const { user } = useAuth();
  const [createCode, setCreateCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [joinMode, setJoinMode] = useBoolean(false);
  const [groupCards, setGroupCards] = useState();

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

  useEffect(() => {
    const getUserGroups = async () => {
      await onValue(ref(db, `users/${user.uid}/groups`), snapshot => {
        const groupData = snapshot.val();

        if (groupData) {
          const groupKeys = Object.keys(groupData);
          setGroupCards(
            groupKeys.map(groups => ({ id: groups, ...groupData[groups] }))
          );
        }
      });
    };
    getUserGroups();
  }, [user.uid]);

  const handleCreate = e => {
    e.preventDefault();

    const groupCode = uuid();
    // const groupCode = '7464935f-696c-46a4-a099-aa7581cb74a3';
    console.log(groupCode);

    const groupPath = `groups/${groupCode}/users`;
    updateDatabase(groupPath, user.uid);

    set(ref(db, `groups/${groupCode}/`), {
      groupName: groupName,
    });
    set(ref(db, `users/${user.uid}/groups/${groupCode}/`), {
      groupName: groupName,
    });

    setCreateCode(groupCode);
    showToast('success', 'Group Created');

    return onClose();
  };

  const handleJoin = e => {
    e.preventDefault();

    get(child(ref(db), `groups/${joinCode}/`))
      .then(snapshot => {
        if (!snapshot.exists()) {
          showToast('error', 'Invalid Code');
        } else if (snapshot.val()['users'].includes(user.uid)) {
          showToast('error', 'You Are Already in This Group');
          setJoinMode.toggle();
          return onClose();
        } else {
          const groupPath = `groups/${joinCode}/users`;
          updateDatabase(groupPath, user.uid);
          set(ref(db, `users/${user.uid}/groups/${joinCode}/`), {
            groupName: snapshot.val()['groupName'],
          });
          showToast('success', 'Group Joined');
          setJoinMode.toggle();
          return onClose();
        }
      })
      .catch(err => {
        showToast('error', err.code);
      });

    e.target.reset();
  };

  const updateDatabase = (path, value) => {
    get(child(ref(db), path))
      .then(snapshot => {
        if (snapshot.exists()) {
          const updateRef = ref(db, path);
          set(updateRef, [...snapshot.val(), value]);
        } else {
          const newRef = ref(db, path);
          set(newRef, [value]);
        }
      })
      .catch(err => {
        showToast('error', err.code);
      });
  };
  return (
    <Stack direction={'column'}>
      <Center mt={8}>
        <Heading size={['2xl', '2xl', '2xl', '3xl']}>My Groups</Heading>
      </Center>

      <Center>
        <Wrap spacing={14} align="center" justify={'center'} mt={8}>
          {/* GET DYNAMIC ROUTER PAGES TO WORK */}
          {/* <RouterLink to={`/groups/${groupCards.id}`}> */}
          {groupCards?.map(data => (
            <GroupCard
              key={data.id}
              groupName={data.groupName}
              groupId={data.id}
              groupUsers={data.users}
            />
          ))}
          {/* </RouterLink> */}

          <WrapItem>
            <Center
              as={Button}
              cursor={'pointer'}
              w={52}
              h={52}
              colorScheme="blue"
              borderRadius={8}
              onClick={onOpen}
            >
              <Icon as={AiOutlineUsergroupAdd} boxSize={20} />
            </Center>
          </WrapItem>
        </Wrap>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {joinMode ? 'Join a Group' : 'Create a New Group'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={joinMode ? handleJoin : handleCreate}>
                <FormControl id="groupName" isRequired>
                  <FormLabel>
                    {joinMode ? 'Group Join Code' : 'Group Name'}
                  </FormLabel>
                  {joinMode ? (
                    <>
                      <Input
                        type={'text'}
                        onChange={e => setJoinCode(e.currentTarget.value)}
                        placeholder="Join Code"
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        onChange={e => setGroupName(e.target.value)}
                        placeholder="Group Name"
                      />
                    </>
                  )}
                </FormControl>
                <Center mt={4}>
                  {joinMode ? (
                    <>
                      <Button colorScheme="blue" type="submit">
                        Join Group
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button colorScheme="blue" onClick={handleCreate}>
                        Create Group
                      </Button>
                    </>
                  )}
                </Center>
              </form>
            </ModalBody>

            <Flex my={4} justify="center">
              <Button w={'90%'} onClick={setJoinMode.toggle}>
                {joinMode ? 'Create a Group' : 'Join a Group'}
              </Button>
            </Flex>
          </ModalContent>
        </Modal>
      </Center>
    </Stack>
  );
};

export default Groups;
