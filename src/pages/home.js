import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

import Header from '../components/header';
import Project from '../components/project';
import ProjectSkeleton from '../components/project.skeleton';
import Task from '../components/task';
import TaskSkeleton from '../components/task.skeleton';

import { useProject } from '../hooks/project';
import { useTask } from '../hooks/task';
import { useAuth } from '../hooks/auth';

export default function HomePage() {
  const { user, logout } = useAuth();
  const { projects = [], prepareCreate: prepareProject } = useProject();
  const { prepareCreate: prepareTask } = useTask();

  return (
    <Box bg="#E5E5E5" minH="100vh" minW="100vw" paddingBottom="30px">
      <Header user={user} onLogout={logout} />

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={30}
        mt="30px"
        padding="0px 80px"
      >
        {projects.map(project => (
          <GridItem key={project?.id}>
            <Project data={project} filterBy={props => props?.data?.isDone}>
              {project?.tasks?.map((task, index) => (
                <Task
                  key={task.id}
                  index={index}
                  data={task}
                  metadata={project}
                />
              ))}
              <TaskSkeleton onClick={() => prepareTask(project.id)} />
            </Project>
          </GridItem>
        ))}

        <GridItem>
          <ProjectSkeleton onClick={prepareProject} />
        </GridItem>
      </Grid>
    </Box>
  );
}
