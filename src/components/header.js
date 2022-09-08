import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import BoltTechBrand from '../assets/icons/logo';

import { IoMdArrowDropdown } from 'react-icons/io';
import Menu from './menu';

export default function Header({ user = {}, onLogout }) {
  return (
    <Flex
      id="header"
      minH="80px"
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      bg="white"
      p="0px 80px"
    >
      <BoltTechBrand />
      <Flex flexDir="row" alignItems="center">
        <Menu onlyLogout onLogout={onLogout}>
          <Flex cursor="pointer" flexDir="row" align="center">
            <IoMdArrowDropdown size={20} />
            <Text ml="8px" mr="20px">
              {user?.name}
            </Text>
          </Flex>
        </Menu>
        <Avatar
          name={user?.name}
          bg="brand"
          height="50px"
          width="50px"
          color="white"
        />
      </Flex>
    </Flex>
  );
}
