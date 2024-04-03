import React, { FC } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Movie } from '../../models';
import { MovieListItem } from './movie-list-item';

export interface MovieListProps {
  movies: Movie[];
}

export const MovieList: FC<MovieListProps> = ({ movies }) => (
  <Grid
    sx={{
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
    }}
  >
    {movies.map(
      (movie) => (
        <GridItem key={movie.id}>
          <MovieListItem movie={movie} />
        </GridItem>
      )
    )}
  </Grid>
);