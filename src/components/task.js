import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { BsInfoCircle } from 'react-icons/bs';

import Menu from '../components/menu';
import { PROJECT_STATUS } from '../contexts/constants';
import ActionButton from './buttons/action';
import { useTask } from '../hooks/task';

export default function Task({ index = 0, data = {}, metadata = {} }) {
  const { create, prepareUpdate, update, resetStatus, remove } = useTask();
  const [state, setState] = useState();

  const handleChangeState = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onConfirm = () => {
    if (create) create(state, data, metadata);

    if (data.status === PROJECT_STATUS.prepareCreate && create)
      create(state, data, metadata);
    if (data.status === PROJECT_STATUS.prepareUpdate && update)
      update(state, data, metadata);
  };

  const onCancel = () => {
    if (data.status === PROJECT_STATUS.prepareUpdate)
      return resetStatus(data.id, metadata.id);

    remove(data.id, metadata.id);
  };

  const onRemove = () => {
    if (remove) remove(data.id, metadata.id);
  };

  const handleIsDone = () => {
    update({ isDone: !data.isDone }, data, metadata);
  };

  return (
    <Flex
      border="1px solid"
      borderColor="border"
      minH="60px"
      borderRadius="5px"
      padding="10px 15px"
      mt={index > 0 ? '10px' : '0px'}
      opacity={data.isDone ? '0.6' : '1'}
    >
      <Flex id="task-action">
        <Checkbox
          disabled={data.isDone}
          isChecked={data.isDone}
          onChange={handleIsDone}
        />
      </Flex>

      <Flex
        id="task-about"
        flex={10}
        flexDir="column"
        ml="15px"
        pr="10px"
        justifyContent="center"
      >
        {[PROJECT_STATUS.prepareCreate, PROJECT_STATUS.prepareUpdate].includes(
          data.status
        ) ? (
          <Input
            autoFocus={true}
            value={state?.content}
            placeholder="Type abou task here..."
            onChange={e => handleChangeState('content', e.target.value)}
            fontWeight="bold"
            fontSize="md"
          />
        ) : (
          <Heading
            size="md"
            fontWeight="700"
            textDecorationLine={data.isDone ? 'line-through' : 'none'}
          >
            {data.content}
          </Heading>
        )}
        <Flex flexDir="row" alignItems="center">
          <Text
            color="#707175"
            opacity="0.7"
            fontSize="0.75rem"
            textDecorationLine={data.isDone ? 'line-through' : 'none'}
          >
            Due Tomorrow
          </Text>

          <Tooltip
            label={`Created in monday at 13:45 pm and finished in tuesday as 14:00 pm.`}
          >
            <Box ml="5px" opacity={0.7} pt="1px">
              <BsInfoCircle color="#707175" size={12} />
            </Box>
          </Tooltip>
        </Flex>
      </Flex>

      <Flex id="task-option">
        {[PROJECT_STATUS.prepareCreate, PROJECT_STATUS.prepareUpdate].includes(
          data.status
        ) ? (
          <Flex alignItems="center">
            <ActionButton type="confirm" onClick={onConfirm} mr="10px" />
            <ActionButton type="cancel" onClick={onCancel} />
          </Flex>
        ) : (
          <Menu
            disabled={data.isDone}
            onEdit={() => prepareUpdate(data.id, metadata.id)}
            onDelete={onRemove}
          >
            <Flex alignItems="center">
              <FiMoreVertical />
            </Flex>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
}
