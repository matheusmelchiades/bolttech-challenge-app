import React from 'react';
import { Checkbox, Flex, Heading, Text } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';

export default function Task({ index = 0, data = {} }) {
  return (
    <Flex
      border="1px solid"
      borderColor="border"
      minH="60px"
      borderRadius="5px"
      padding="5px 15px"
      mt={index > 0 ? '10px' : '0px'}
    >
      <Flex id="task-action">
        <Checkbox isChecked={data.isDone} />
      </Flex>

      <Flex id="task-about" flex={10} flexDir="column" ml="15px">
        <Heading size="md" fontWeight="700">
          {data.content}
        </Heading>
        <Text color="707175" opacity="0.7" fontSize="0.75rem">
          Due Tomorrow
        </Text>
      </Flex>

      <Flex id="task-option">
        <Flex alignItems="center">
          <FiMoreVertical />
        </Flex>
      </Flex>
    </Flex>
  );
}
