import { background, theme as chakraTheme, extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';

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
    default: chakraTheme.colors.white,
    highlighted: colors.red['500'],
  },
  interactive: {
    button: {
      default: chakraTheme.colors.white,
      secondary: colors.red['500'],
      ghost: colors.red['500'],
      background: {
        default: colors.red['500'],
        secondary: colors.gray['800'],
        transparent: transparentize(colors.gray['400'], 68)
      },
    },
    input: {
      background: {
        default: transparentize(colors.gray['700'], 96),
        search: transparentize(colors.gray['700'], 80)
      }
    }
  },
};

const fonts = {
  body: 'Montserrat'
};

const components = {
  Button: {
    baseStyle: {
      fontWeigth: 500,
      textTransform: 'uppercase',
    },
    variants: {
      primary: {
        backgroundColor: colorTokens.interactive.button.background.default,  
        color: colorTokens.interactive.button.default,
      },
      secondary: {
        background: colorTokens.interactive.button.background.secondary,
        color: colorTokens.interactive.button.secondary,
        borderColor: colorTokens.interactive.button.ghost,
        borderWidth: 1,
      },
      transparent: {
        background: colorTokens.interactive.button.background.transparent,
        color: colorTokens.interactive.button.ghost,
      }
    },
    sizes: {
      lg: {
        borderRadius: 3,
        paddingY: 4,
        paddingX: 12
      },
    },
  },
  Input: {
    variants: {
      default: {
        backgroundColor: colorTokens.interactive.input.background.default,
      },
      search: {
        field: {
          background: colorTokens.interactive.input.background.search,
        },
      },
    },
    sizes: {
      lg: {
        field: {
          borderRadius: 3,
        }
      }
    },
  },
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
  },
};

export const theme = extendTheme({
  colors: {
    ...colors,
    ...colorTokens,
  },
  fonts,
  styles,
  components,
});
