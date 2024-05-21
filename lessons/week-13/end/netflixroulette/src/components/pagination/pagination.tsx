import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonProps, IconButton, ListItem, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';

export interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
  maxPages?: number;
  goto: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ goto, total, limit, offset, maxPages = 10 }) => {
  const currentPage = Math.round(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const pages = new Array(Math.min(maxPages, totalPages || 1)).fill(0).map((_, index) => index + 1);

  return (
    <UnorderedList as="nav" listStyleType="none" display="flex" justifyContent="space-between" gap="2" marginLeft="0">
      <ListItem>
        <IconButton
          {...buttonStyle}
          aria-label="Előző"
          icon={<ArrowBackIcon />}
          onClick={() => goto(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
      </ListItem>
      <UnorderedList listStyleType="none" display="flex" gap="2" marginLeft="0">
        {pages.map((page) => (
          <ListItem key={page}>
            {page === currentPage ? (
              <Button {...buttonStyle} variant="primary">{page}</Button>
            ) : (
              <Button {...buttonStyle} onClick={() => goto(page)}>{page}</Button>
            )}
          </ListItem>
        ))}
      </UnorderedList>
      <ListItem>
        <IconButton
          {...buttonStyle}
          aria-label="Következő"
          icon={<ArrowForwardIcon />}
          onClick={() => goto(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </ListItem>
    </UnorderedList>
  );
};

const buttonStyle: ButtonProps = {
  size: 'md',
  borderRadius: '50%',
  width: '3em',
  height: '3em',
  overflow: 'hidden',
  variant: 'secondary',
};
