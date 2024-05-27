import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { PhoneNumber } from '../decorators/transform.phone-number';
import { TrimmedText } from '../decorators/transform.trimmed-text';

export abstract class Address {
  @ApiProperty({
    type: String,
    description: 'Név',
    example: 'President of U.S.A.',
  })
  @TrimmedText()
  @IsString()
  @MinLength(2, { message: 'A név legalább 2 karakter hosszú legyen!' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Ország',
    example: 'United States of America',
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az országot!' })
  country: string;

  @ApiProperty({
    type: String,
    description: 'Város',
    example: 'Washington D.C.'
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az várost!' })
  city: string;

  @ApiProperty({
    type: String,
    description: 'Utca, házszám',
    example: '1600 Pennsylvania Avenue NW',
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az utcát és házszámot!' })
  street: string;

  @ApiProperty({
    type: String,
    description: 'Irányítószám',
    example: '20500 U.S.',
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az irányítószámot!' })
  zip: string;

  constructor(address?: Address) {
    if (address) {
      this.name = address.name;
      this.country = address.country;
      this.city = address.city;
      this.street = address.street;
      this.zip = address.zip;
    }
  }
}

export class BillingAddress extends Address {
  @ApiProperty({
    type: String,
    description: 'Adószám (11 számjegy)',
    required: false,
    example: '12345678911'
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/i, { message: 'Érvénytelen adószám: 11 számjegy' })
  taxNumber?: string;

  constructor(address?: Address) {
    super(address);
    if (address && 'taxNumber' in address) {
      this.taxNumber = address.taxNumber as typeof this.taxNumber;
    }
  }
}

export class ShippingAddress extends Address {
  @ApiProperty({
    type: String,
    description: 'Telefonszám (+36201234567)',
    example: '+36201234567'
  })
  @IsString()
  @PhoneNumber()
  @Matches(/^\+[\d]{3,15}$/i, { message: 'Hibás telefonszám' })
  phoneNumber: string;

  constructor(address?: Address) {
    super(address);
    if (address && 'phoneNumber' in address) {
      this.phoneNumber = address.phoneNumber as string;
    }
  }
}
