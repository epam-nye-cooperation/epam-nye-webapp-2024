import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';
/*import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';*/

import { transparentize } from './utils/transparentize';

const colors = {
  gray: {
    200: '#979797',
    400: '#606060',
    500: '#555555',
    600: '#424242',
    700: '#323232',
    800: '#232323',
    900: '#080707',
  },
  red: {
    500: '#F65261',
  },
};

const colorTokens = {
  background: {
    default: colors.gray['500'],
    medium: colors.gray['600'],
    dark: colors.gray['800']
  },
  border: {
    default: colors.gray['200'],
    highlighted: colors.red['500'],
  },
  text: {
    default: '#FFF', //chakraTheme.colors.white,
    highlighted: colors.red['500'],
  },
  interactive: {
    button: {
      default: '#FFF', //chakraTheme.colors.white,
      secondary: colors.red['500'],
      background: {
        default: colors.red['500'],
        secondary: transparentize(colors.gray['400'], 68),
      },
    },
    input: {
      background: {
        default: transparentize(colors.gray['700'], 80),
      }
    }
  },
};

const fonts = {
  body: 'Montserrat'
};

const styles = {
  global: {
    body: {
      backgroundColor: 'gray.500',
      color: 'white',
      height: '100vh',
      paddingY: 12,
    },
    '#root': {
      height: '100%'
    }
  }  
};

export const theme = extendTheme({
  colors: {
    ...colors,
    ...colorTokens,
  },
  fonts,
  styles,
});
