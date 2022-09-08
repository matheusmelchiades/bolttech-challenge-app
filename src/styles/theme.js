import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import * as components from './components';

const theme = extendTheme({
  components,
  colors,
});

export default theme;
