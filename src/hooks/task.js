import { useContext } from 'react';
import { TaskContext } from '../contexts/task';

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('You must use useTask hook inside the Providers');
  }

  return context;
};
