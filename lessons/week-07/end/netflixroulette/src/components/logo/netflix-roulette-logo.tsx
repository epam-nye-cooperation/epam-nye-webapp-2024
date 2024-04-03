import React, { FC } from 'react';
import { Heading, Link, Text } from '@chakra-ui/react';
export const NetflixRoulletteLogo: FC = () => (
  <Link
    href="/"
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
