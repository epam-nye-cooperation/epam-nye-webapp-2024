import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys);

export const inputTheme = defineStyleConfig({
  variants: {
    outline: definePartsStyle({
      field: {
        backgroundColor: 'interactive.input.background.default',
        borderColor: 'transparent',
        _hover: {
          borderColor: 'background.medium',
        }
      }
    }),
    search: definePartsStyle({
      field: {
        background: 'interactive.input.background.search',
      },
    }),
  },
  sizes: {
    lg: definePartsStyle({
      field: {
        borderRadius: 3,
      }
    })
  }
});
