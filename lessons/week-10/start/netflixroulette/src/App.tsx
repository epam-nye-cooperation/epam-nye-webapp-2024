import * as React from 'react'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { theme } from './theme';
import { MovieListPage, MoviePage, NetflixRouletteLogo, SearchPage } from './components';
import { Route, Routes } from 'react-router-dom';
import { MovieProvider } from "./state"

//App.tsx
export const App = () => (
  <ChakraProvider theme={theme}>
    <MovieProvider>
      <Container maxWidth="7xl">
        <NetflixRouletteLogo />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
        <MovieListPage />
      </Container>
    </MovieProvider>
  </ChakraProvider>
)
