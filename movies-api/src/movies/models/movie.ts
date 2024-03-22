import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GENRES, GenreValues } from './genre';
import {
  IsArray,
  IsDateString,
  IsEnum,
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
  release_date: string;
  poster_path?: string | null;
  overview: string;
  budget?: number;
  genres: GenreValues[];
  runtime: number;
}

export class RawMovie implements MovieBase {
  @ApiProperty({
    type: String,
    description: 'Film címe',
    example: 'Deadpool & Wolverine'
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiPropertyOptional({
    description: 'Alcím',
    example: 'Come together.'
  })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 10,
    default: 0,
    description: 'Átlagos értékelés'
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Az átlag értékelés nem lehet negatív' })
  @Max(10, { message: 'Az átlag értékelés nem lehet több, mint 10' })
  vote_average: number = 0;

  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
    description: 'Szavazatok száma',
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'A szavazatok száma nem lehet negatív' })
  vote_count: number = 0;

  @ApiProperty({
    format: 'date',
    description: 'Megjelenés ideje (ÉÉÉÉ-HH-NN)',
    example: '2024-07-26',
  })
  @IsDateString({}, { message: 'Hibás dátumformátum' })
  release_date: string = '';

  @ApiPropertyOptional({
    format: 'url',
    description: 'Poszter',
    example: null,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Hibás URL cím' })
  poster_path?: string;

  @ApiProperty({
    description: 'Leírás',
    example: 'Third entry in the "Deadpool" franchise. Plot TBA.'
  })
  @IsString()
  @IsNotEmpty({ message: 'Kérjük adjon meg leírást' })
  overview: string;

  @ApiPropertyOptional({
    minimum: 0,
    description: 'Büdzsé (USD)'
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'A büdzsé nem lehet negatív' })
  budget?: number;

  @ApiPropertyOptional({
    minimum: 0,
    description: 'Bevétel (USD)'
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'A bevétel nem lehet negatív' })
  revenue?: number;

  @ApiProperty({
    enum: [Object.values(GenreValues)],
    description: 'Film típus'
  })
  @IsArray()
  @IsEnum(GenreValues, { each: true, message: ({ constraints }) => `A típus az alábbiak közül választható: ${constraints[1]}` })
  genres: GenreValues[] = [];

  @ApiProperty({
    minimum: 0,
    default: 0,
    description: 'A film hossza (perc)'
  })
  @IsInt()
  @Min(0, { message: 'A film hossza nem lehet negatív' })
  runtime: number = 0;
}

export class Movie extends RawMovie {
  @ApiProperty({
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  id: number;
}
