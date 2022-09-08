import { Avatar, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

import BoldTechBrand from '../assets/images/boldtech.png';

import { IoMdArrowDropdown } from 'react-icons/io';

export default function Header() {
  return (
    <Flex
      id="header"
      minH="80px"
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      bg="white"
      shadow="0px 4px 4px rgba(0, 0, 0, 0.15);"
      p="0px 80px"
    >
      <Image src={BoldTechBrand} />
      <Flex flexDir="row" alignItems="center">
        <Flex cursor="pointer" flexDir="row" align="center">
          <IoMdArrowDropdown size={20} />
          <Text ml="8px" mr="20px">
            Matheus Maciel
          </Text>
        </Flex>
        <Avatar name="Matheus maciel" />
      </Flex>
    </Flex>
  );
}
