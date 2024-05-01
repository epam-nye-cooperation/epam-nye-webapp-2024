import { Box, Button, ButtonGroup, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { ChangeEvent, FC, FormEvent, Reducer, useCallback, useEffect, useReducer } from 'react';

export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  errorMessage?: string;
}

interface LoginFormState {
  username: string;
  password: string;
  error?: string;
}

const INITIAL_STATE: LoginFormState = {
  username: '',
  password: '',
};

const LoginFormReducer: Reducer<LoginFormState, Partial<LoginFormState>> = (state, action) => ({
  ...state,
  ...action,
});

export const LoginForm: FC<LoginFormProps> = ({ errorMessage, onLogin }) => {
  const [state, dispatch] = useReducer(LoginFormReducer, INITIAL_STATE);

  const { username, password, error } = state;
  const isEnabled = !!username && !!password;

  const onSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isEnabled) {
      return;
    }
    onLogin(username, password);
  };

  const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ username: event.target.value ?? '' });
  }, []);

  const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ password: event.target.value ?? '' });
  }, []);

  useEffect(() => {
    dispatch({ error: errorMessage });
  }, [errorMessage]);

  return (
    <Box as="form" bgColor="background.dark" py="9" px="16" onSubmit={onSubmit}>
      <VStack maxW="lg" spacing={5} marginX="auto">
        <Text color={ error ? 'text.highlighted' : 'text-default' }>
          {error || 'Kérjük adja meg a felhasználónevét és jelszavát!'}
        </Text>
        <FormControl>
          <FormLabel>Felhasználónév:</FormLabel>
          <Input value={username} onChange={onChangeUsername} />
        </FormControl>
        <FormControl>
          <FormLabel>Jelszó:</FormLabel>
          <Input type="password" value={password} onChange={onChangePassword} />
        </FormControl>
        <ButtonGroup>
          <Button type="reset" variant="transparent">Mégsem</Button>
          <Button type="submit" isDisabled={!isEnabled} variant="primary">Belépés</Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};
