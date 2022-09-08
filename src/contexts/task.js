import { createContext } from 'react';
import { useProject } from '../hooks/project';
import { PROJECT_STATUS } from './constants';

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { push, replaceTask, pop } = useProject();

  const prepareCreate = projectId => {
    const task = {
      id: new Date().getTime().toString(),
      content: '',
      status: PROJECT_STATUS.prepareCreate,
      createdAt: new Date().toISOString(),
      finishedAt: new Date(2022, 8, 9).toISOString(),
    };

    push(projectId, task);
  };

  const create = (task, skeleton, project) => {
    const newTask = {
      ...skeleton,
      ...task,
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
      finishedAt: new Date(2022, 8, 9).toISOString(),
      status: null,
    };

    replaceTask(project.id, skeleton.id, newTask);
  };

  const prepareUpdate = (id, projectId) => {
    replaceTask(projectId, id, {
      status: PROJECT_STATUS.prepareUpdate,
    });
  };

  const update = (updateTask, task, project) => {
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

  const remove = (id, projectId) => {
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
