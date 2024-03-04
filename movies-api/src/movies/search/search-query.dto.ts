import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
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
    description: 'List of genres the movie has',
    enum: GENRES,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsIn(GENRES, { each: true })
  @Type(() => String)
  genres?: Genre[];

  @ApiProperty({
    required: false,
    description: 'Query string to search within title or description',
  })
  @IsOptional()
  @IsString()
  search?: string = '';

  @ApiProperty({
    required: false,
    description: 'Sort by movie params',
    enum: MovieSortBy,
  })
  @IsOptional()
  @IsEnum(MovieSortBy)
  sortBy?: MovieSortBy;

  @ApiProperty({
    required: false,
    description: 'Ascending/Descending order',
    enum: MovieSortOrder,
  })
  @IsOptional()
  @IsEnum(MovieSortOrder)
  sortOrder?: MovieSortOrder;

  @ApiProperty({
    required: false,
    description: 'Offset for pagination',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number = 0;

  @ApiProperty({
    required: false,
    description: 'Number of items to return',
    minimum: 0,
    default: 12,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  limit?: number = 12;
}
