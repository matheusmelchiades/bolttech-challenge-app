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
});

export default theme;
