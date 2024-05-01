import React, { FC } from 'react';
import { useAuthContext } from '../../auth/auth.context';
import { Box, Button, IconButton, Link } from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const ProfileButton: FC = () => {
  const { user, logout } = useAuthContext();

  if (!user) {
    return (
      <Button as={NavLink} to="/login" size="sm" variant="primary">Belépés</Button>
    );
  }

  return (
    <Box>
      <Link as={NavLink} to="/profile">Üdv, {user.lastName}</Link>
      <IconButton onClick={logout} icon={<ExternalLinkIcon />} aria-label="Kilépés" variant="transparent" size="sm" marginLeft="2" />
    </Box>
  );
};
