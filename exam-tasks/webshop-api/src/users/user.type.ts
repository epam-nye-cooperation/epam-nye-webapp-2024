import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsStrongPasswordOptions,
  ValidateNested,
  ValidationArguments,
  validateOrReject,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';
import { TrimmedText } from '../decorators/transform.trimmed-text';
import { CreateAddress } from '../decorators/transform.address';
import { BillingAddress, ShippingAddress } from './address.type';

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
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
}

export type UserResponse = Omit<User, 'password'>;

export class LoginRequest {
  @Transform(({ value }) => (value ? `${value}`.trim().toLowerCase() : ''))
  @ApiProperty({ type: String, description: 'Felhasználói név (email cím)', example: 'admin@local.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Érvénytelen email cím',
    },
  )
  username: string;

  @ApiProperty({ type: String, description: 'A jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel', example: 'admin123' })
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
  implements Omit<User, 'userId' | 'email'>
{
  @ApiProperty({ type: String, description: 'Jelszó megerősítése', example: '' })
  @IsString()
  @Match('password', { message: 'A két jelszó nem egyezik!' })
  passwordConfirm: string;

  @ApiProperty({ type: String, description: 'Keresztnév', example: '' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: 'Vezetéknév', example: '' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: ShippingAddress,
    description: 'Szállítási és számlázási címek',
  })
  @CreateAddress('shipping')
  @ValidateNested()
  shippingAddress: ShippingAddress;

  @ApiProperty({
    type: BillingAddress,
    description: 'Szállítási és számlázási címek',
  })
  @CreateAddress('billing')
  @ValidateNested()
  billingAddress: BillingAddress;
}

export class RegisterUserResponse implements UserResponse {
  @ApiProperty({ type: String, description: 'Felhasználó azonosítója', example: 'c3621d67-c304-41ad-b965-907f74d46bf2' })
  userId: string;

  @ApiProperty({ type: String, description: 'E-mail cím', example: 'numbuh1@knd.com' })
  email: string;

  @ApiProperty({ type: String, description: 'Keresztnév', example: 'Nigel' })
  firstName: string;

  @ApiProperty({ type: String, description: 'Vezetéknév', example: 'Uno' })
  lastName: string;

  @ApiProperty({ type: ShippingAddress, description: 'Szállítási cím' })
  shippingAddress: ShippingAddress;

  @ApiProperty({ type: BillingAddress, description: 'Számlázási cím' })
  billingAddress: BillingAddress;
}

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
  @ApiProperty({ type: String, description: 'A régi jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel', example: 'admin123' })
  @IsString()
  @IsStrongPassword(PASSWORD_REQUIREMENTS, { message: PasswordValidationMessage })
  oldPassword: string;

  @ApiProperty({ type: String, description: 'Az új jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel', example: 'admin321' })
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

export interface UpdateUserData extends Omit<UserResponse, 'userId' | 'email'> {}

export class UpdateUserDataBody implements UpdateUserData {
  @ApiProperty({ type: String, description: 'Keresztnév', example: 'Hyper' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: 'Vezetéknév', example: 'Admin' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: ShippingAddress, description: 'Szállítási cím' })
  @CreateAddress('shipping')
  @ValidateNested()
  shippingAddress: ShippingAddress;

  @ApiProperty({ type: BillingAddress, description: 'Számlázási cím', required: false })
  @CreateAddress('billing')
  @ValidateNested()
  billingAddress: BillingAddress;
}
