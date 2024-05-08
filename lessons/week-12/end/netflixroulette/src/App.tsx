import * as React from 'react'
import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { theme } from './theme';
import { MovieListPage, MoviePage, NetflixRouletteLogo, SearchPage } from './components';
import { Route, Routes } from 'react-router-dom';
import { MovieProvider } from "./state"
import { LoginPage } from './components/login/login-page';
import { AuthProvider, ProtectedRoute } from './auth';
import { ProfilePage } from './components/profile/profile-page';
import { ProfileButton } from './components/profile/profile-button';
import { MovieEditor } from './components/movie-editor';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <MovieProvider>
        <Container maxWidth="7xl">
          <Flex justifyContent="space-between" marginBottom="4" alignItems="center">
            <NetflixRouletteLogo />
            <ProfileButton />
          </Flex>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
          <MovieListPage />
          <MovieEditor />
        </Container>
      </MovieProvider>
    </AuthProvider>
  </ChakraProvider>
)
