import React from 'react';
import {
  Menu as Component,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdModeEdit, MdDelete, MdLogout } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

export default function Menu({
  disabled = false,
  onEdit,
  onDelete,
  children,
  onLogout,
}) {
  return (
    <Component>
      <MenuButton disabled={disabled}>{children}</MenuButton>

      <MenuList
        bg="white"
        shadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
        borderRadius="5px"
      >
        {onEdit && (
          <MenuItem
            padding="10px 25px"
            icon={<MdModeEdit color="#00BAC7" size="20px" />}
            onClick={onEdit}
          >
            Edit
          </MenuItem>
        )}
        {onDelete && (
          <React.Fragment>
            <MenuDivider />

            <MenuItem
              padding="10px 25px"
              icon={<MdDelete color="#00BAC7" size="20px" />}
              onClick={onDelete}
            >
              Remove
            </MenuItem>
          </React.Fragment>
        )}
        {onLogout && (
          <MenuItem
            padding="10px 25px"
            icon={<BiLogOut color="#00BAC7" size="20px" />}
            onClick={onLogout}
          >
            Logout
          </MenuItem>
        )}
      </MenuList>
    </Component>
  );
}
