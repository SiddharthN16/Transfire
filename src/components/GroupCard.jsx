import { Stack, Center, Wrap, WrapItem, Button, Text } from '@chakra-ui/react';

const GroupCard = ({ groupName, groupId, groupUsers }) => {
  return (
    <WrapItem>
      <Center
        as={Button}
        cursor={'pointer'}
        w={52}
        h={52}
        colorScheme="red"
        borderRadius={8}
      >
        <Text>{groupName}</Text>
      </Center>
    </WrapItem>
  );
};

export default GroupCard;
