import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RefreshParamaters {
  @ApiProperty({
    description: 'The Movie Database API key',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({
    description: 'Language identifier',
    default: 'hu',
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string = 'hu';
}
