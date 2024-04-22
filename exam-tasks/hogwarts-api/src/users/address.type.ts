import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TrimmedText } from 'src/decorators/transform.trimmed-text';

export class Address {
  @ApiProperty({
    type: String,
    description: 'Név',
    example: 'Severus Snape',
  })
  @TrimmedText()
  @IsString()
  @MinLength(2, { message: 'A név legalább 2 karakter hosszú legyen!' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Ország',
    example: 'United Kingdom',
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az országot!' })
  country: string;

  @ApiProperty({
    type: String,
    description: 'Város',
    example: 'Cokeworth'
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az várost!' })
  city: string;

  @ApiProperty({
    type: String,
    description: 'Utca, házszám',
    example: 'Spinner\'s End 7',
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Adja meg az utcát és házszámot!' })
  street: string;

  @ApiProperty({
    type: String,
    description: 'Irányítószám',
    example: '9GFF+GG',
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
