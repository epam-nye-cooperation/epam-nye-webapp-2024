import React, { FC } from 'react';
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { Movie } from '../../models';
import { Rating } from './rating';

export interface MovieDescriptionProps {
  movie: Movie;
}

const formatRuntime = (runtime: number | null): string => {
  if (!runtime) {
    return "";
  }
  const runtimeMins = runtime % 60;
  const runtimeHours = Math.round((runtime - runtimeMins) / 60);
  return `${runtimeHours}h ${runtimeMins}min`;
};

export const MovieDescription: FC<MovieDescriptionProps> = ({ movie }) => {
  return (
    <Box as="article" bgColor="background.dark" pb="7" pt="9" px="16">
      <Flex justifyContent="space-between" gap={10}>
        <AspectRatio ratio={323 / 486} flexBasis="30%" flexShrink={0}>
          <Image src={movie.poster_path} />
        </AspectRatio>
        <Box flexGrow={1}>
          <Box as="header" marginBottom={8}>
            <HStack spacing={6}>
              <Heading fontSize="4xl" textTransform="uppercase">{movie.title}</Heading>
              <Rating rate={movie.vote_average} />
            </HStack>
            {movie.tagline && <Text>{movie.tagline}</Text>}
          </Box>
          <HStack as="time" spacing={12} color="text.highlighted" fontSize="2xl" mb="7">
            <Text as="span">{movie.release_date.getFullYear()}</Text>
            <Text as="span">{formatRuntime(movie.runtime)}</Text>
          </HStack>
          <Text fontSize="xl" opacity={0.5}>{movie.overview}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
