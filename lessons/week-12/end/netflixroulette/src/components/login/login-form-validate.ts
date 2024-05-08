import { object, string } from 'yup';

export const loginFormValidate = object({
  username: string()
    .required('Kérjük adja meg felhasználónevét')
    .email('Hibás e-mail cím'),
  password: string()
    .required('Kérjük adja meg jelszavát')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
      'A jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel'
    ),
});
