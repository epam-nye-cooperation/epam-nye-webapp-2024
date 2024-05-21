import { Box, Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC } from 'react';
import { loginFormValidate } from './login-form-validate';

export interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  errorMessage?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ errorMessage, onLogin }) => {
  const { errors, values, isSubmitting, isValid, isValidating, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }, { setFieldValue, setSubmitting }) => {
      const loggedIn = await onLogin(username, password);
      if (!loggedIn) {
        setFieldValue('password', '');
      }
      setSubmitting(false);
    },
    validationSchema: loginFormValidate,
  });

  return (
    <Box as="form" bgColor="background.dark" py="9" px="16" onSubmit={handleSubmit}>
      <VStack maxW="lg" spacing={5} marginX="auto">
        <Text color={ errorMessage ? 'text.highlighted' : 'text-default' }>
          {errorMessage || 'Kérjük adja meg a felhasználónevét és jelszavát!'}
        </Text>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Felhasználónév:</FormLabel>
          <Input name="username" value={values.username} onChange={handleChange} />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Jelszó:</FormLabel>
          <Input name="password" type="password" value={values.password} onChange={handleChange} />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <ButtonGroup isDisabled={isSubmitting}>
          <Button type="reset" variant="transparent" onClick={handleReset}>Mégsem</Button>
          <Button type="submit" isDisabled={isSubmitting || isValidating || !isValid}>Belépés</Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};
