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
        <Flex justifyContent="space-between" opacity={0.5} gap="2">
          <Heading
            as="header"
            flexGrow={1}
            gap={2}
            display="flex"
            flexDirection="column"
          >
            <Text as="h4" fontSize="lg" lineHeight="7" fontWeight="medium">
              <LinkOverlay as={NavLink} to={`/movie/${movie.id}`}>{movie.title}</LinkOverlay>
            </Text>
            {movie.tagline && <Text fontSize="sm" marginRight="-12">{movie.tagline}</Text>}
          </Heading>
          <Text as="time" dateTime={movie.release_date.toISOString().split('T')[0]} sx={{
            border: "solid 1px",
            borderColor: "border.default",
            borderRadius: 4,
            fontSize: "xs",
            flexShrink: 0,
            height: 7,
            paddingX: 2,
            paddingY: 1,
            textWrap: 'nowrap',
            width: 12,
          }}>
            {movie.release_date.getFullYear()}
          </Text>
        </Flex>
      </LinkBox>
    </Box>
  );
};