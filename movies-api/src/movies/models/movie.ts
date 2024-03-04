import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenreValues } from './genre';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export interface MovieBase {
  title: string;
  tagline?: string;
  vote_avarage?: number;
  vote_count?: number;
  release_date?: string;
  poster_path: string;
  overview: string;
  budget?: number;
  genres: GenreValues[];
  runtime: number;
}

export class RawMovie implements MovieBase {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiPropertyOptional({
    required: false,
  })
  @IsOptional()
  @IsString()
  tagLine?: string;

  @ApiPropertyOptional({
    required: false,
    minimum: 0,
    maximum: 100,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  vote_average: number = 0;

  @ApiPropertyOptional({
    required: false,
    minimum: 0,
    maximum: 100,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vote_count: number = 0;

  @ApiProperty({
    required: true,
    format: 'date',
  })
  @IsDateString()
  release_date: string = '';

  @ApiPropertyOptional({
    required: false,
    format: 'url',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  poster_path: string;

  @ApiProperty()
  @IsString()
  overview: string;

  @ApiPropertyOptional({
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @ApiPropertyOptional({
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  revenue?: number;

  @ApiProperty()
  @IsArray()
  @IsIn(Object.values(GenreValues), { each: true })
  genres: GenreValues[] = [];

  @ApiProperty({
    minimum: 0,
    default: 0,
  })
  @IsInt()
  @Min(0)
  runtime: number = 0;

  @ApiPropertyOptional({
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  tagline: string = '';
}

export class Movie extends RawMovie {
  @ApiProperty({
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  id: number;
}
