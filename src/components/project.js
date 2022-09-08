import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import Menu from './menu';
import ActionButton from './buttons/action';
import { useProject } from '../hooks/project';
import { PROJECT_STATUS } from '../contexts/project';

const TABS = {
  todo: 'TODO',
  completed: 'COMPLETED',
};

const styleSelected = {
  color: 'brand',
  borderBottom: '3px solid',
  borderColor: 'brand',
};

export default function Project({ data = {}, children, filterBy }) {
  const toast = useToast();
  const { create, update, remove, resetStatus, prepareUpdate } = useProject();
  const [tab, setTab] = useState(TABS.todo);
  const [state, setState] = useState({});

  const changeTab = (tab = TABS.todo) => {
    setTab(tab);
  };

  const handleChangeState = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onConfirm = () => {
    if (!state.name || state?.name?.length < 3)
      return toast({
        title: 'Error to create a project',
        description: 'You should set a name to create a project!',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });

    if (data.status === PROJECT_STATUS.prepareCreate && create)
      create(state, data);
    if (data.status === PROJECT_STATUS.prepareUpdate && update)
      update(state, data);
  };

  const onCancel = () => {
    if (data.status === PROJECT_STATUS.prepareUpdate)
      return resetStatus(data.id);

    remove(data.id);
  };

  const onRemove = () => {
    if (remove) remove(data.id);
  };

  const childrenFiltred = React.Children.toArray(children).filter(child =>
    tab === TABS.todo
      ? !filterBy(child.props)
      : filterBy(child.props) && child?.type?.name === 'Task'
  );

  return (
    <Box
      id="project"
      bg="white"
      minHeight={640}
      borderRadius="5px"
      padding="25px 15px"
    >
      <Flex id="project-head" justifyContent="space-between">
        {[PROJECT_STATUS.prepareCreate, 'PREPARE_UPDATE'].includes(
          data?.status
        ) ? (
          <Input
            value={state.name}
            autoFocus
            placeholder="Project name..."
            onChange={e => handleChangeState('name', e.target.value)}
          />
        ) : (
          <Heading size="sm">
            {`Project ${
              data?.name?.includes('Project')
                ? data?.name?.replace('Project', '')
                : data?.name
            }`}
          </Heading>
        )}

        {[PROJECT_STATUS.prepareCreate, 'PREPARE_UPDATE'].includes(
          data?.status
        ) ? (
          <Box>
            <ActionButton type="confirm" onClick={onConfirm} mr="10px" />
            <ActionButton type="cancel" onClick={onCancel} />
          </Box>
        ) : (
          <Menu onEdit={() => prepareUpdate(data.id)} onDelete={onRemove}>
            <Flex alignItems="center">
              <FiMoreVertical />
            </Flex>
          </Menu>
        )}
      </Flex>

      <Flex
        borderBottom="1px solid"
        borderColor="border"
        margin="30px -15px 0px -15px"
        padding="0px 15px"
      >
        <Box
          pb="5px"
          onClick={() => changeTab(TABS.todo)}
          cursor="pointer"
          {...(tab === TABS.todo ? styleSelected : {})}
        >
          <Text color={tab === TABS.todo ? 'brand' : ''} fontWeight="bold">
            Todo
          </Text>
        </Box>
        <Box
          ml="25px"
          onClick={() => changeTab(TABS.completed)}
          cursor="pointer"
          {...(tab === TABS.completed ? styleSelected : {})}
        >
          <Text fontWeight="bold" opacity={0.6}>
            Completed
          </Text>
        </Box>
      </Flex>

      <Flex id="project-items" mt="20px" flexDir="column">
        {childrenFiltred}
      </Flex>
    </Box>
  );
}
