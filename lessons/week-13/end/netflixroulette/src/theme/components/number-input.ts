import { numberInputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';
import { fieldBaseStyle } from './input';

const { definePartsStyle } = createMultiStyleConfigHelpers(numberInputAnatomy.keys);

export const numberInputTheme = defineStyleConfig({
  baseStyle: definePartsStyle({
    field: {
      ...fieldBaseStyle,
      paddingRight: 10,
    },
    stepperGroup: {
      width: 10,
    },
    stepper: {
      borderColor: 'transparent',
      color: 'text.highlighted',
    },
  }),
});
