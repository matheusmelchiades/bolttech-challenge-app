import React from 'react';
import { Box, Checkbox, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { BsInfoCircle } from 'react-icons/bs';

import Menu from '../components/menu';

export default function Task({ index = 0, data = {} }) {
  return (
    <Flex
      border="1px solid"
      borderColor="border"
      minH="60px"
      borderRadius="5px"
      padding="10px 15px"
      mt={index > 0 ? '10px' : '0px'}
    >
      <Flex id="task-action">
        <Checkbox isChecked={data.isDone} />
      </Flex>

      <Flex
        id="task-about"
        flex={10}
        flexDir="column"
        ml="15px"
        justifyContent="center"
      >
        <Heading size="md" fontWeight="700">
          {data.content}
        </Heading>
        <Flex flexDir="row" alignItems="center">
          <Text color="#707175" opacity="0.7" fontSize="0.75rem">
            Due Tomorrow
          </Text>

          <Tooltip
            label={`Created in monday at 13:45 pm and finished in tuesday as 14:00 pm.`}
          >
            <Box ml="5px" opacity={0.7} pt="1px">
              <BsInfoCircle color="#707175" size={12} />
            </Box>
          </Tooltip>
        </Flex>
      </Flex>

      <Flex id="task-option">
        <Menu>
          <Flex alignItems="center">
            <FiMoreVertical />
          </Flex>
        </Menu>
      </Flex>
    </Flex>
  );
}
