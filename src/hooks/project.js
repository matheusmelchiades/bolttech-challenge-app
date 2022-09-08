import { useContext } from 'react';
import { ProjectContext } from '../contexts/project';

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('You must use useProject hook inside the Providers');
  }

  return context;
};
