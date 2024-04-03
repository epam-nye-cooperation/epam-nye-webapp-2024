import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme';
import { MovieListPage, NetflixRoulletteLogo } from './components';

export const App = () => (
  <ChakraProvider theme={theme}>
    <NetflixRoulletteLogo />
    <MovieListPage />
  </ChakraProvider>
)
