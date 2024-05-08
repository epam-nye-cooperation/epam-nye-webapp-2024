import { TriangleDownIcon } from '@chakra-ui/icons';
import { Checkbox, CheckboxGroup, Grid, Menu, MenuButton, MenuItem, MenuList, Text, useFormControlContext } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { Genre } from '../../models';

export interface GenreSelectorProps {
  genres?: Genre[];
  value?: Genre[];
  onChange?: (genres: Genre[] | null) => void;
}

const defaultGenreList = Object.values(Genre);

export const GenreSelector: FC<GenreSelectorProps> = ({ value, genres = defaultGenreList, onChange }) => {
  const [selectedItems, setSelectedItems] = useState(value || []);
  const { isInvalid } = useFormControlContext();

  const listItems = useMemo(() => genres.sort(), [genres]);

  const onChangeHandler = (values: string[]) => {
    setSelectedItems(values.sort() as Genre[]);
    onChange?.(values as Genre[]);
  };

  return (
    <Menu size="md" variant="input">
      <MenuButton type="button" width="full" sx={
        (isInvalid ? {
          border: 'solid 1px',
          borderColor: 'text.highlighted',
          boxShadow: '0 0 0 1px #F65261',
          outlineOffset: '2px',
        } : {})
      }>
        <Text as="span" sx={
          (selectedItems.length ? {} : {
            color: 'interactive.input.placeholder',
            opacity: 0.8,
          })
        }>{selectedItems?.join(', ') || 'Válasszon típust'}</Text>
        <TriangleDownIcon color="text.highlighted" />
      </MenuButton>
      <CheckboxGroup value={value} onChange={onChangeHandler}>
        <MenuList as={Grid} gridTemplateColumns="repeat(3, 1fr)">
          {listItems.map((genre) => (
            <MenuItem as={Checkbox} value={genre} closeOnSelect={false} key={genre}>
              {genre}
            </MenuItem>
          ))}
        </MenuList>
      </CheckboxGroup>
    </Menu>
  );
};