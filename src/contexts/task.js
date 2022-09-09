import { createContext } from 'react';
import { useProject } from '../hooks/project';
import { PROJECT_STATUS } from './constants';

import taskService from '../services/task';
import { useToast } from '@chakra-ui/react';

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const toast = useToast();
  const { push, replaceTask, pop } = useProject();

  const prepareCreate = projectId => {
    const task = {
      id: new Date().getTime().toString(),
      content: '',
      status: PROJECT_STATUS.prepareCreate,
      createdAt: new Date().toISOString(),
      dueAt: new Date().toISOString(),
    };

    push(projectId, task);
  };

  const create = async (task, skeleton, project) => {
    const { data, error } = await taskService.create({
      content: task.content,
      dueAt: task.dueAt || new Date().toISOString(),
      projectId: project.id,
    });

    if (error) {
      return toast({
        title: 'Error on create!',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      replaceTask(project.id, skeleton.id, {
        ...data,
        status: null,
      });
    }
  };

  const prepareUpdate = (id, projectId) => {
    replaceTask(projectId, id, {
      status: PROJECT_STATUS.prepareUpdate,
    });
  };

  const update = async (updateTask, task, project) => {
    const { error } = await taskService.update(task.id, updateTask);

    if (error)
      return toast({
        title: 'Error on update!',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });

    replaceTask(project.id, task.id, {
      ...task,
      ...updateTask,
      status: null,
    });
  };

  const resetStatus = (id, projectId) => {
    replaceTask(projectId, id, {
      status: null,
    });
  };

  const remove = async (id, projectId) => {
    const { error } = await taskService.delete(id);

    if (error)
      return toast({
        title: 'Error on delete!',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });

    pop(projectId, id);
  };

  return (
    <TaskContext.Provider
      value={{
        prepareCreate,
        create,
        prepareUpdate,
        resetStatus,
        remove,
        update,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
