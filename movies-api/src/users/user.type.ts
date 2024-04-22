import { ApiProperty, PickType } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    description: 'Felhasználónév',
    example: 'admin@local.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Adja meg a felhasználónevet' })
  @IsEmail(
    {},
    {
      message: 'Hibás email cím',
    }
  )
  username: string;

  @ApiProperty({
    type: String,
    description: 'Jelszó',
    example: 'admin123'
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
        `A jelszónak legalább ${minLength} karakter hosszúnak kell lennie legalább ${minNumbers} számmal és ${minLowercase} kisbetűvel`,
    }
  )
  password: string;
}

export class LoginResponse {
  @ApiProperty({ type: String, format: 'jwt', description: 'JSON Web Token' })
  accessToken: string;
}

export class RegisterUserRequestBody
  extends LoginRequest
  implements Omit<User, 'userId' | 'email'>
{
  @ApiProperty({
    type: String,
    description: 'Keresztnév',
    required: true,
    example: 'Root'
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : null))
  @IsString()
  @IsNotEmpty({ message: 'A keresztnév megadása kötelező' })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Vezetéknév',
    required: true,
    example: 'Kiskacsa'
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : null))
  @IsString()
  @IsNotEmpty({ message: 'A vezetéknév megadása kötelező' })
  lastName: string;
}

export class RegisterUserResponse extends PickType(RegisterUserRequestBody, ['firstName', 'lastName'] as const ) {
  @ApiProperty({ type: String, description: 'Felhasználó azonosítója', example: 'c3621d67-c304-41ad-b965-907f74d46bf2' })
  userId: string;
}

export const validateLoginRequest = async (
  username: string,
  password: string
): Promise<void> => {
  const login = new LoginRequest();
  login.username = username;
  login.password = password;
  return validateOrReject(login);
};
