import { defineStyleConfig } from '@chakra-ui/react';

export const formLabelTheme = defineStyleConfig({
  baseStyle: {
    color: 'text.highlighted',
    textTransform: 'uppercase',
    _required: {
      before: '*'
    },
  }
});