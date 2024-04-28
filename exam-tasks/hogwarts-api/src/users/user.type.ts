import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsStrongPasswordOptions,
  ValidateNested,
  ValidationArguments,
  validateOrReject,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';
import { Address } from './address.type';
import { HouseId } from '../hogwarts/houses/houses.type';
import { CreateAddress } from '../decorators/transform.address';
import { TrimmedText } from '../decorators/transform.trimmed-text';

const PASSWORD_REQUIREMENTS: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minUppercase: 0,
  minSymbols: 0,
};

const PasswordValidationMessage = ({
  constraints: [{ minLength, minLowercase, minNumbers }],
}: ValidationArguments) => `A jelszónak legalább ${minLength} karakter hosszúnak kell lennie legalább ${minNumbers} számmal és ${minLowercase} kisbetűvel`;

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  homeAddress: Address;
  notificationAddress?: Address;
  house?: HouseId;
}

export type UserResponse = Omit<User, 'password'>;

export class LoginRequest {
  @Transform(({ value }) => (value ? `${value}`.trim().toLowerCase() : ''))
  @ApiProperty({ type: String, description: 'Felhasználói név (email cím)', example: 'albus.dumbledore@hogwarts.co.uk' })
  @IsString()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Érvénytelen email cím',
    },
  )
  username: string;

  @ApiProperty({ type: String, description: 'A jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel', example: 'LemonDr0p' })
  @IsString()
  @IsStrongPassword(PASSWORD_REQUIREMENTS, { message: PasswordValidationMessage })
  password: string;
}

export class LoginResponse {
  @ApiProperty({ type: String, description: 'JWT Bearer token' })
  accessToken: string;
}

export class RegisterUserRequestBody
  extends LoginRequest
  implements Omit<User, 'userId' | 'email' | 'house'>
{
  @ApiProperty({ type: String, description: 'Jelszó megerősítése', example: '' })
  @IsString()
  @Match('password', { message: 'A két jelszó nem egyezik!' })
  passwordConfirm: string;

  @ApiProperty({ type: String, description: 'Keresztnév', example: 'Severus' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: 'Vezetéknév', example: 'Snape' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: Address,
    description: 'Lakcím',
  })
  @CreateAddress()
  @ValidateNested()
  homeAddress: Address;

  @ApiProperty({
    type: Address,
    description: 'Értesítési cím',
    required: false,
  })
  @CreateAddress()
  @IsOptional()
  @ValidateNested()
  notificationAddress?: Address;
}

export class RegisterUserResponse implements UserResponse {
  @ApiProperty({ type: String, description: 'Felhasználó azonosítója', example: 'c3621d67-c304-41ad-b965-907f74d46bf2' })
  userId: string;

  @ApiProperty({ type: String, description: 'E-mail cím', example: 'severus.snape@hogwarts.co.uk' })
  email: string;

  @ApiProperty({ type: String, description: 'Keresztnév', example: 'Severus' })
  firstName: string;

  @ApiProperty({ type: String, description: 'Vezetéknév', example: 'Snape' })
  lastName: string;

  @ApiProperty({ type: Address, description: 'Lakcím' })
  homeAddress: Address;

  @ApiProperty({ type: Address, description: 'Értesítési cím', required: false })
  notificationAddress?: Address;

  @ApiProperty({ enum: HouseId })
  house?: HouseId;
}

export class UserListItem extends PickType(RegisterUserResponse, ['userId', 'firstName', 'lastName', 'email'] as const) {}

export const validateLoginRequest = async (
  username: string,
  password: string,
) => {
  const login = new LoginRequest();
  login.username = username;
  login.password = password;
  return validateOrReject(login);
};

export class ChangePasswordBody {
  @ApiProperty({ type: String, description: 'A régi jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel', example: 'LemonDr0p' })
  @IsString()
  @IsStrongPassword(PASSWORD_REQUIREMENTS, { message: PasswordValidationMessage })
  oldPassword: string;

  @ApiProperty({ type: String, description: 'Az új jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel', example: 'LemonDr0p' })
  @IsString()
  @IsStrongPassword(PASSWORD_REQUIREMENTS, { message: PasswordValidationMessage })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Új Jelszó megerősítése',
    example: '',
  })
  @IsString()
  @Match('password', { message: 'A két jelszó nem egyezik!' })
  passwordConfirm: string;
}

export interface UpdateUserData extends Omit<UserResponse, 'userId' | 'email' | 'house'> {}

export class UpdateUserDataBody
  extends PickType(RegisterUserResponse, ['homeAddress', 'notificationAddress'] as const)
  implements UpdateUserData
{
  @ApiProperty({ type: String, description: 'Keresztnév', example: 'Severus' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: 'Vezetéknév', example: 'Snape' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: Address, description: 'Lakcím' })
  @CreateAddress()
  @ValidateNested()
  homeAddress: Address;

  @ApiProperty({ type: Address, description: 'Értesítési cím', required: false })
  @CreateAddress()
  @IsOptional()
  @ValidateNested()
  notificationAddress?: Address;
}
