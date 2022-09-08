import React from 'react';

import { ProjectProvider } from '../contexts/project';

export default function Providers({ children }) {
  return (
    <React.Fragment>
      <ProjectProvider>{children}</ProjectProvider>
    </React.Fragment>
  );
}
