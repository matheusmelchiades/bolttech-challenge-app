import React, { createContext, useEffect, useState } from 'react';
import { PROJECT_STATUS } from './constants';

import projectService from '../services/projects';
import { useToast } from '@chakra-ui/react';

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const toast = useToast()
  const [projects, setProjects] = useState([]);

  const prepareCreate = () => {
    const alreadyPrepare = projects.find(
      p => p.status === PROJECT_STATUS.prepareCreate
    );

    if (alreadyPrepare) return;

    setProjects([
      ...projects,
      {
        id: new Date().getTime().toString(),
        status: PROJECT_STATUS.prepareCreate,
        tasks: [],
      },
    ]);
  };

  const create = async project => {
    const { data } = await projectService.create(project);

    setProjects([
      ...projects.filter(p => p.status !== PROJECT_STATUS.prepareCreate),
      {
        ...data,
        tasks: [],
        status: null,
      },
    ]);
  };

  const remove = async id => {
    const { error } = await projectService.delete(id);

    if (!error) setProjects(projects.filter(p => p.id !== id));
  };

  const prepareUpdate = id => {
    setProjects(
      projects.map(p => ({
        ...p,
        status: p.id === id ? PROJECT_STATUS.prepareUpdate : null,
      }))
    );
  };

  const update = async (projectUpdate, project) => {
    const { data, error } = await projectService.update(
      project.id,
      projectUpdate
    );

    if (error) {
      return toast({
        title: 'Error on update!',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      setProjects(
        projects.map(p => {
          if (p.id === project.id)
            return {
              ...data,
              status: null,
            };

          return p;
        })
      );
    }
  };

  const resetStatus = id => {
    setProjects(projects.map(p => ({ ...p, status: null })));
  };

  const push = (id, task) => {
    setProjects(
      projects.map(p => {
        if (p.id === id)
          return {
            ...p,
            tasks: [...p.tasks, task],
          };

        return p;
      })
    );
  };

  const pop = (id, taskId) => {
    setProjects(
      projects.map(p => {
        if (p.id === id) {
          return {
            ...p,
            tasks: p.tasks.filter(t => t.id !== taskId),
          };
        }

        return p;
      })
    );
  };

  const replaceTask = (id, taskId, task) => {
    setProjects(
      projects.map(p => {
        if (p.id === id)
          return {
            ...p,
            tasks: p.tasks?.map(t => {
              if (t.id === taskId)
                return {
                  ...t,
                  ...task,
                };

              return t;
            }),
          };

        return p;
      })
    );
  };

  useEffect(() => {
    (async () => {
      const { data } = await projectService.getAll();

      setProjects(data);
    })();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        create,
        prepareCreate,
        remove,
        update,
        prepareUpdate,
        resetStatus,
        push,
        replaceTask,
        pop,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
