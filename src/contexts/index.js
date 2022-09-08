import React from 'react';

import { ProjectProvider } from '../contexts/project';
import { TaskProvider } from './task';

export default function Providers({ children }) {
  return (
    <React.Fragment>
      <ProjectProvider>
        <TaskProvider>{children}</TaskProvider>
      </ProjectProvider>
    </React.Fragment>
  );
}
