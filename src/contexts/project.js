import React, { createContext, useState } from 'react';
import { PROJECT_STATUS } from './constants';

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
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

  const create = project => {
    setProjects([
      ...projects.filter(p => p.status !== PROJECT_STATUS.prepareCreate),
      {
        id: new Date().getTime().toString(),
        name: project.name,
        tasks: [],
        status: null,
      },
    ]);
  };

  const remove = id => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const prepareUpdate = id => {
    setProjects(
      projects.map(p => ({
        ...p,
        status: p.id === id ? PROJECT_STATUS.prepareUpdate : null,
      }))
    );
  };

  const update = (projectUpdate, project) => {
    setProjects(
      projects.map(p => {
        if (p.id === project.id)
          return {
            status: null,
            ...projectUpdate,
          };

        return p;
      })
    );
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
