import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const inputStyle = definePartsStyle({
  button: {
    height: 10,
    paddingX: 4,
    '> span': {
      alignItems: 'center',
      display: 'flex',
      height: 'full',
      gap: 4,
      justifyContent: 'space-between',
      textWrap: 'nowrap',
    },
    '&[aria-expanded="true"]': {
      svg: {
        transform: 'rotate(180deg)',
      },
    },
  },
})

export const menuTheme = defineStyleConfig({
  baseStyle: definePartsStyle({
    button: {
      background: 'interactive.input.background.default',
      borderRadius: 3,
      color: 'white',
    },
    list: {
      backgroundColor: 'background.dark',
    },
    item: {
      backgroundColor: 'background.dark',
      _hover: {
        backgroundColor: 'background.medium',
      }
    },
  }),
  variants: {
    placeholder: {
      ...inputStyle,
      button: {
        ...inputStyle.button,
        color: 'interactive.input.placeholder',
      }
    },
    input: definePartsStyle({
      ...inputStyle,
      button: {
        ...inputStyle.button,
        fontWeight: 'thin',
        opacity: 0.8,
      },
    }),
  }
});
