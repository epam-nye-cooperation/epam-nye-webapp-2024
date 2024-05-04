import { Button, Flex, Input } from '@chakra-ui/react';
import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';

export interface SearchBoxProps {
  query: string;
  onSearch: (query: string) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({ query, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
      onSearch(searchQuery);
    },
    [searchQuery, onSearch]
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, [setSearchQuery]);

  return (
    <Flex as="form" gap={4} onSubmit={onSubmit}>
      <Input
        placeholder="What do you want to watch?"
        size="lg"
        value={searchQuery}
        onChange={onChange}
        variant="search"
      />
      <Button type="submit" size="lg" width={233}>Search</Button>
    </Flex>
  );
};