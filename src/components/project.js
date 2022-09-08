import React, { useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import Menu from './menu';

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
  const [tab, setTab] = useState(TABS.todo);

  const changeTab = (tab = TABS.todo) => {
    setTab(tab);
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
        <Heading size="sm">
          {`Project ${
            data.name.includes('Project')
              ? data.name.replace('Project', '')
              : data.name
          }`}
        </Heading>
        <Menu>
          <Flex alignItems="center">
            <FiMoreVertical />
          </Flex>
        </Menu>
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
