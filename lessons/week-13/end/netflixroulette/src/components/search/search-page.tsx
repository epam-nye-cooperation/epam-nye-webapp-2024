import React, { FC } from 'react';
import { useMovieContext } from '../../state';
import { SearchBox } from './search-box';
import { Box, Container, Heading } from '@chakra-ui/react';
import backgroundImage from '../../images/netflix-roulette.png';

export const SearchPage: FC = () => {
  const { searchParams, search } = useMovieContext();
  return (
    <Box width="full" backgroundColor="background.dark" position="relative" overflow="hidden">
      <Box
        backgroundImage={backgroundImage}
        backgroundSize="105%"
        backgroundPosition="10%"
        backgroundRepeat="no-repeat"
        filter="blur(3px)"
        position="absolute"
        width="full"
        height="full"
        zIndex="0"
        opacity="30%"
      />
      <Container maxWidth="4xl" paddingY="16" position="relative" zIndex="1">
        <Heading as="h3" textTransform="uppercase" fontSize="4xl" fontWeight="normal" marginBottom="9">
          Find your movie
        </Heading>
        <SearchBox query={searchParams.search} onSearch={search} />
      </Container>
    </Box>
  );
};
