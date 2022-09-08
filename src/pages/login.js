import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import BoltTechBrand from '../assets/icons/logo';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Flex
      bg="#E5E5E5"
      minH="100vh"
      minW="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        bg="white"
        minHeight="40vh"
        minW="30vw"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        padding="45px 45px"
        borderRadius="5px"
        mt="-10vh"
      >
        <BoltTechBrand height={50} />

        <Heading fontSize="24px" fontWeight="bold" mt="20px">
          Sign in
        </Heading>

        <Input
          variant="outline"
          placeholder="Email"
          width="100%"
          border="1px solid"
          borderColor="border"
          borderRadius="5px"
          padding="5px"
          mt="30px"
          textAlign="center"
          type="email"
        />
        <Input
          placeholder="Password"
          width="100%"
          border="1px solid"
          borderColor="border"
          borderRadius="5px"
          padding="5px"
          mt="15px"
          textAlign="center"
          type="password"
        />

        <Button
          bg="brand"
          color="white"
          width="100%"
          borderRadius="5px"
          mt="35px"
          minH="35px"
        >
          Sign in
        </Button>

        <Flex mt="15px">
          <Text
            fontSize="0.85rem"
            opacity="0.7"
            cursor="pointer"
            _hover={{ color: 'brand' }}
            onClick={() => navigate('/register')}
          >
            Don't have an account?
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
