import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidationArguments,
  validateOrReject,
} from 'class-validator';

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class LoginRequest {
  @Transform(({ value }) => (value ? `${value}`.trim().toLowerCase() : ''))
  @ApiProperty({ name: 'username', type: String })
  @IsString()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    }
  )
  username: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description:
      'Password should be at least 8 char length and must contain at least 1 number and 1 lower case letter',
  })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 0,
      minSymbols: 0,
    },
    {
      message: ({
        constraints: [{ minLength, minLowercase, minNumbers }],
      }: ValidationArguments) =>
        `Password should be at least ${minLength} chars length, must contain at least ${minNumbers} number and ${minLowercase} lower case letter`,
    }
  )
  password: string;
}

export class RegisterUserRequestBody
  extends LoginRequest
  implements Omit<User, 'userId' | 'email'>
{
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : null))
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : null))
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export const validateLoginRequest = async (
  username: string,
  password: string
) => {
  const login = new LoginRequest();
  login.username = username;
  login.password = password;
  return validateOrReject(login);
};
