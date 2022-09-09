import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import * as components from './components';

const theme = extendTheme({
  components,
  colors,
  fonts: {
    heading: `Inter, 'Open Sans', sans-serif`,
    body: `Inter, 'Raleway', sans-serif`,
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
});

export default theme;
