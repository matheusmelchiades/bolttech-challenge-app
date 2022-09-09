import {
  Avatar,
  Flex,
  IconButton,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';

import BoltTechBrand from '../assets/icons/logo';

import { IoMdArrowDropdown, IoIosOptions } from 'react-icons/io';
import Menu from './menu';

export default function Header({ user = {}, onLogout }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      id="header"
      minH={isMobile ? '60px' : '80px'}
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      bg="white"
      p="0px 80px"
    >
      <BoltTechBrand />

      {isMobile ? (
        <Menu onlyLogout onLogout={onLogout}>
          <Flex cursor="pointer" align="center">
            <IoIosOptions size={20} />
          </Flex>
        </Menu>
      ) : (
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
      )}
    </Flex>
  );
}
