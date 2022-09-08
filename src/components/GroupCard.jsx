import { Stack, Center, Wrap, WrapItem, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const GroupCard = ({ groupName, groupId, groupUsers }) => {
  return (
    <WrapItem>
      <RouterLink to={`/groups/${groupId}`}>
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
      </RouterLink>
    </WrapItem>
  );
};

export default GroupCard;
