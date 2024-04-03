import { AspectRatio, Flex, Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Movie } from '../../models';

export interface MovieListItemProps {
  movie: Movie;
}

export const MovieListItem: FC<MovieListItemProps> = ({ movie }) => {
  return (
    <LinkBox>
      <AspectRatio ratio={322 / 455} marginBottom={7}>
        <Image src={movie.poster_path} />
      </AspectRatio>
      <Flex justifyContent="space-between" opacity={0.5}>
        <LinkOverlay href={`/movie/${movie.id}`}>
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
  );
};