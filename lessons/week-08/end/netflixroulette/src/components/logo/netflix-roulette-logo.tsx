import React, { FC } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Heading, Link, Text } from '@chakra-ui/react';
export const NetflixRouletteLogo: FC = () => (
  <Link
    as={NavLink}
    to="/"
    _hover={{
      textDecoration: "none",
    }}
  >
    <Heading fontSize="xl" color="text.highlighted">
      <Text as="span" fontWeight="black">netflix</Text>
      <Text as="span" fontWeight="medium">roulette</Text>
    </Heading>
  </Link>
);
