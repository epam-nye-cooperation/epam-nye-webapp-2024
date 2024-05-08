import { AspectRatio, Box, Flex, Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Movie } from '../../models';
import { useAuthContext } from '../../auth/auth.context';
import { MovieListItemMenu } from './movie-list-item-menu';

export interface MovieListItemProps {
  movie: Movie;
}

export const MovieListItem: FC<MovieListItemProps> = ({ movie }) => {
  const { user } = useAuthContext();  

  return (
    <Box position="relative">
      {user && <MovieListItemMenu movie={movie} />}
      <LinkBox>
        <AspectRatio ratio={322 / 455} marginBottom={7}>
          <Image src={movie.poster_path} />
        </AspectRatio>
        <Flex justifyContent="space-between" opacity={0.5}>
          <LinkOverlay as={NavLink} to={`/movie/${movie.id}`}>
            <Heading
              as="header"
              flexGrow={1}
              gap={2}
              display="flex"
              flexDirection="column"
            >
              <Text as="h4" fontSize="lg" fontWeight="medium">{movie.title}</Text>
              {movie.tagline && <Text fontSize="sm">{movie.tagline}</Text>}
            </Heading>
          </LinkOverlay>
          <Text sx={{
            border: "solid 1px",
            borderColor: "border.default",
            borderRadius: 4,
            fontSize: "sm",
            height: 8,
            paddingX: 2,
            paddingY: 1,
          }}>
            {movie.release_date.getFullYear()}
          </Text>
        </Flex>
      </LinkBox>
    </Box>
  );
};