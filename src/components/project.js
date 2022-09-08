import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import Menu from './menu';

export default function Project({ children }) {
  return (
    <Box
      id="project"
      bg="white"
      minHeight={640}
      borderRadius="5px"
      padding="25px 15px"
    >
      <Flex id="project-head" justifyContent="space-between">
        <Heading size="sm">Project megazord</Heading>
        <Menu>
          <Flex alignItems="center">
            <FiMoreVertical />
          </Flex>
        </Menu>
      </Flex>

      <Flex
        borderBottom="1px solid"
        borderColor="border"
        margin="30px -15px 0px -15px"
        padding="0px 15px"
      >
        <Box pb="5px" borderBottom="3px solid" borderColor="brand">
          <Text color="brand" fontWeight="bold">
            Todo
          </Text>
        </Box>
        <Box ml="25px">
          <Text fontWeight="bold" opacity={0.6}>
            Completed
          </Text>
        </Box>
      </Flex>

      <Flex id="project-items" mt="20px" flexDir="column">
        {children}
      </Flex>
    </Box>
  );
}
