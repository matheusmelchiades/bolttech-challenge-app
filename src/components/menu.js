import React from 'react';
import {
  Menu as Component,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdModeEdit, MdDelete } from 'react-icons/md';

export default function Menu({ onEdit, onDelete, children }) {
  return (
    <Component>
      <MenuButton>{children}</MenuButton>

      <MenuList
        bg="white"
        shadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
        borderRadius="5px"
      >
        <MenuItem
          padding="10px 25px"
          icon={<MdModeEdit color="#00BAC7" size="20px" />}
          onClick={onEdit}
        >
          Edit
        </MenuItem>
        <MenuDivider />

        <MenuItem
          padding="10px 25px"
          icon={<MdDelete color="#00BAC7" size="20px" />}
          onClick={onDelete}
        >
          Remove
        </MenuItem>
      </MenuList>
    </Component>
  );
}
