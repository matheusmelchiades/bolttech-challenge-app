import { Button, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BoltTechBrand from '../assets/icons/logo';
import { useAuth } from '../hooks/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { register } = useAuth();
  const [state, setState] = useState({});

  const handleChangeState = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onRegister = () => {
    if (state.password !== state.passwordConfirm)
      return toast({
        title: 'Passwords is not matching!',
        description: 'passwords are wrong!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });

    if (register) register(state.username, state.password);
  };
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
          Register
        </Heading>

        <Input
          variant="outline"
          placeholder="username"
          width="100%"
          border="1px solid"
          borderColor="border"
          borderRadius="5px"
          padding="5px"
          mt="30px"
          textAlign="center"
          type="text"
          onChange={e => handleChangeState('username', e.target.value)}
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
          onChange={e => handleChangeState('password', e.target.value)}
        />
        <Input
          placeholder="Password confirm"
          width="100%"
          border="1px solid"
          borderColor="border"
          borderRadius="5px"
          padding="5px"
          mt="15px"
          textAlign="center"
          type="password"
          onChange={e => handleChangeState('passwordConfirm', e.target.value)}
        />

        <Button
          bg="brand"
          color="white"
          width="100%"
          borderRadius="5px"
          mt="35px"
          minH="35px"
          onClick={onRegister}
        >
          Register
        </Button>

        <Flex mt="15px">
          <Text
            fontSize="0.85rem"
            opacity="0.7"
            cursor="pointer"
            _hover={{ color: 'brand' }}
            onClick={() => navigate('/login')}
          >
            Already have an account?
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
