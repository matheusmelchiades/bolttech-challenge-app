import React, { createContext, useState } from 'react';

export const PROJECT_STATUS = {
  prepareCreate: 'PREPARE_CREATE',
  prepareUpdate: 'PREPARE_UPDATE',
};

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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        create,
        prepareCreate,
        remove,
        update,
        prepareUpdate,
        resetStatus
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
