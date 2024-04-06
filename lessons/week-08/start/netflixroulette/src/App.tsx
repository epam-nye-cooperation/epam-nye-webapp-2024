import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme';
import { MovieListPage, NetflixRouletteLogo } from './components';

export const App = () => (
  <ChakraProvider theme={theme}>
    <NetflixRouletteLogo />
    <MovieListPage />
  </ChakraProvider>
)
