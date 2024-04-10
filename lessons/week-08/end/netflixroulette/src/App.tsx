import * as React from 'react'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { theme } from './theme';
import { MovieListPage, NetflixRouletteLogo } from './components';
import { Route, Routes } from 'react-router-dom';
import { MoviePage } from './components/movie-page/movie-page';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container maxWidth="7xl">
      <NetflixRouletteLogo />
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
      </Routes>
    </Container>
  </ChakraProvider>
)
