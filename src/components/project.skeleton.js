import { Box, Flex, Tooltip } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

export default function ProjectSkeleton({ onClick }) {
  return (
    <Flex
      id="project"
      minHeight={640}
      borderRadius="5px"
      padding="25px 15px"
      border="4px dashed"
      borderColor="brand"
      alignItems="center"
      justifyContent="center"
      bg="rgba(230, 231, 236, 0.2)"
      _hover={{
        bg: 'rgba(230, 231, 236, 1)',
      }}
      cursor="pointer"
      onClick={onClick}
    >
      <Tooltip label="NEW PROJECT">
        <Box color="brand" padding="10px">
          <AiOutlinePlus size={48} />
        </Box>
      </Tooltip>
    </Flex>
  );
}
