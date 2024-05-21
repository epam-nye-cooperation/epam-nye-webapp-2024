import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys);

export const fieldBaseStyle = {
  backgroundColor: 'interactive.input.background.default',
  borderColor: 'transparent',
  borderRadius: 3,
  opacity: 0.8,
  '&:placeholder-shown': {
    color: "interactive.input.placeholder",
  },
  _hover: {
    borderColor: 'background.medium',
  },
  '&[type="date"]': {
    '&::-webkit-calendar-picker-indicator': {
      display: 'none',
      '-webkit-appearance': 'none',
    },
    '[value=""]': {
      color: "interactive.input.placeholder",
    }
  },
};

export const inputTheme = defineStyleConfig({
  variants: {
    outline: definePartsStyle({
      field: fieldBaseStyle,
      group: fieldBaseStyle,
    }),
    search: definePartsStyle({
      field: {
        background: 'interactive.input.background.search',
      },
    }),
  }
});
