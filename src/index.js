import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './styles/theme';
import Providers from './contexts';

import 'react-datepicker/dist/react-datepicker.css';
import Routes from './routes';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Providers>
        <Routes />
      </Providers>
    </ChakraProvider>
  </StrictMode>
);
