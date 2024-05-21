import { ChakraProps, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';
import { Genre, GenreId } from '../../models';

const LIST_ITEMS = Object.entries(Genre).slice(0, 5) as Array<[GenreId, Genre]>;

interface MovieTypeFilterProps {
  selectFilter: (genre: GenreId | null) => void;
  selectedFilters?: GenreId[];
}

export const MovieTypeFilter: FC<MovieTypeFilterProps> = ({ selectedFilters, selectFilter }) => {

  return (
    <UnorderedList listStyleType="none" display="flex" gap="4">
      <ListItem height={12} onClick={() => selectFilter(null)}>
        <Link sx={linkStyle}>Minden</Link>
      </ListItem>
      {LIST_ITEMS.map(([genre, label], index) => (
        <ListItem onClick={() => selectFilter(genre)} key={index}>
          <Link sx={linkStyle} {...(selectedFilters?.includes(genre) ? {'data-active': 'true'} : {})}>{label}</Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

const linkStyle: ChakraProps['sx'] = {
  alignItems: 'center',
  display: 'flex',
  textTransform: 'uppercase',
  height: 12,
  position: 'relative',
  '&:after': {
    borderBottom: 'solid 1px',
    borderBottomColor: 'text.highlighted',
    position: 'absolute',
    bottom: '-9px',
    left: 0,
    right: 0,
  },
  _hover: { '&:after': { content: '""' } },
  _active: { '&:after': { content: '""' } },
};
