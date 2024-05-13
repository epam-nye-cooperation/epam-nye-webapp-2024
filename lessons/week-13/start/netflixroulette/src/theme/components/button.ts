import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: 'primary',
  },
  baseStyle: {
    fontWeigth: 500,
    textTransform: 'uppercase',
  },
  variants: {
    primary: defineStyle({
      backgroundColor: 'interactive.button.background.default',
      color: 'interactive.button.default',
    }),
    secondary: defineStyle({
      background: 'interactive.button.background.secondary',
      color: 'interactive.button.secondary',
      borderColor: 'interactive.button.ghost',
      borderWidth: 1,
    }),
    transparent: defineStyle({
      background: 'interactive.button.background.transparent',
      color: 'interactive.button.ghost',
    })
  },
  sizes: {
    lg: defineStyle({
      borderRadius: 3,
      paddingY: 4,
      paddingX: 12
    })
  }
});