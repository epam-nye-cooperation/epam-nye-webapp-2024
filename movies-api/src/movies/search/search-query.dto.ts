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

export enum MovieOrderBy {
  TITLE_ASC = 'title.ASC',
  TITLE_DESC = 'title.DESC',
  VOTE_ASC = 'vote_average.ASC',
  VOTE_DESC = 'vote_average.DESC',
  RELEASE_DATE_ASC = 'release_date.ASC',
  RELEASE_DATE_DESC = 'release_date.DESC',
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
    enum: MovieOrderBy,
  })
  @IsOptional()
  @IsEnum(MovieOrderBy, { message: ({ constraints }) => `Rendezéshez válasszon az alábbi értékek közül: ${constraints.join(', ')}` })
  orderBy?: MovieOrderBy;

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
