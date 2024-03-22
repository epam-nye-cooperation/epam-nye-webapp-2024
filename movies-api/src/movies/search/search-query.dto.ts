import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Genre, GENRES } from '../models';

export enum MovieSortBy {
  'title' = 'title',
  'vote_avarage' = 'vote_average',
  'release_date' = 'release_date',
  'budget' = 'budget',
  'runtime' = 'runtime',
}

export enum MovieSortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class MovieSearchQuery {
  @ApiProperty({
    required: false,
    description: 'A filmhez tartozó típusok',
    enum: GENRES,
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  @IsArray()
  @IsEnum(GENRES, { each: true, message: ({ constraints }) => `A típus az alábbiak közül választható: ${constraints.join(', ')}` })
  genres?: Genre[];

  @ApiProperty({
    required: false,
    description: 'Keresés a címben és leírásban',
    example: 'deadpool',
  })
  @IsOptional()
  @IsString()
  search?: string = '';

  @ApiProperty({
    required: false,
    description: 'Eredmények rendezése cím, megjelenés ideje, átlagos értékelés, keretösszeg vagy időtartam szerint',
    enum: MovieSortBy,
  })
  @IsOptional()
  @IsEnum(MovieSortBy, { message: ({ constraints }) => `Rendezéshez válasszon az alábbi értékek közül: ${constraints.join(', ')}` })
  sortBy?: MovieSortBy;

  @ApiProperty({
    required: false,
    description: 'Növekvő vagy csökkenő sorrend',
    enum: MovieSortOrder,
  })
  @IsOptional()
  @IsEnum(MovieSortOrder, { message: ({ constraints }) => `Rendezés irányához válasszon az alábbi értékek közül: ${constraints.join(', ')}` })
  sortOrder?: MovieSortOrder;

  @ApiProperty({
    required: false,
    description: 'Lapozás kezdő értéke',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'A lapozás kiindulási értéke nem lehet 0-nál kevesebb' })
  @Type(() => Number)
  offset?: number = 0;

  @ApiProperty({
    required: false,
    description: 'Visszaadott elemek maximális száma',
    minimum: 0,
    default: 12,
  })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'A visszaadott elemek száma nem lehet 0-nál kevesebb' })
  @Type(() => Number)
  limit?: number = 12;
}
