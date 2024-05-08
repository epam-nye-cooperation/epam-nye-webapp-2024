import { modalAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle } = createMultiStyleConfigHelpers(modalAnatomy.keys);

export const modalTheme = defineStyleConfig({
  baseStyle: definePartsStyle({
    dialog: {
      background: 'background.dark',
    },
    header: {
      fontWeight: 'light',
      lineHeight: 'shorter',
      textTransform: 'uppercase',
    },
    closeButton: {
      fontSize: 'xl',
      insetEnd: 6,
      top: 6,
    },
  })
});