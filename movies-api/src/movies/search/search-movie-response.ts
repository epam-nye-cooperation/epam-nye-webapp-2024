import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../models';

export class SearchMovieResponse {
  @ApiProperty({
    minimum: 0,
    example: 0,
  })
  total: number;
  @ApiProperty({
    type: [Movie],
    example: [],
  })
  data: Movie[] = [];
}
