import { Box, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
export default function TaskSkeleton({ onClick }) {
  return (
    <Flex
      border="1px dashed"
      borderColor="brand"
      minH="60px"
      borderRadius="5px"
      padding="10px 15px"
      mt="10px"
      alignItems="center"
      justifyContent="center"
      bg="rgba(230, 231, 236, 0.2)"
      _hover={{
        bg: 'rgba(230, 231, 236, 1)',
      }}
      cursor="pointer"
      onClick={onClick}
    >
      <Tooltip label="NEW TASK">
        <Box color="brand" padding="10px">
          <AiOutlinePlus />
        </Box>
      </Tooltip>
    </Flex>
  );
}
