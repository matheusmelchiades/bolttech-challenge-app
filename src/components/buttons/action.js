import { IconButton } from '@chakra-ui/react';

import { GoCheck } from 'react-icons/go';
import { HiX } from 'react-icons/hi';

export default function ActionButton({ type, onClick, ...props }) {
  if (type === 'cancel')
    return (
      <IconButton
        variant="solid"
        icon={<HiX color="danger"/>}
        onClick={onClick}
        border="2px"
        borderRadius="5px"
        padding="5px"
        color="danger"
        {...props}
      />
    );

  return (
    <IconButton
      variant="solid"
      icon={<GoCheck color="success"/>}
      onClick={onClick}
      border="2px"
      borderRadius="5px"
      padding="5px"
      color="success"
      {...props}
    />
  );
}
