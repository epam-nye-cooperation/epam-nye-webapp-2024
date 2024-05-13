import React, { FC } from 'react';
import { Button, Center, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useAuthContext } from '../../auth/auth.context';

export const ProfilePage: FC = () => {
  const { user, inProgress, logout } = useAuthContext();

  return (
    <VStack bgColor="background.dark" py="9" px="16" spacing={4} alignItems="flex-start">
      {inProgress ? <Center minHeight="lg"><Spinner rotate="true" /></Center> : (
        user && (
          <>
            <Heading as="h2">Üdvözöljük, {user.firstName} {user.lastName}</Heading>
            <Text>Email cím: {user.email}</Text>
            <Button variant="primary" onClick={logout}>Kilépés</Button>
          </>
        )
      ) }
    </VStack>
  );
};
