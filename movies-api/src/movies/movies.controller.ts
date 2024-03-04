import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovieSearchQuery } from './search/search-query.dto';
import { Movie, RawMovie } from './models';
import { MovieService } from './movies.service';
import { SearchMovieResponse } from './search';

@ApiTags('Movie')
@Controller('/movies')
export class MoviesController {
  constructor(private movies: MovieService) {}

  @ApiOperation({
    operationId: 'getMovies',
    description: 'Search within available movies',
  })
  @Get()
  @ApiOkResponse({
    type: SearchMovieResponse,
  })
  @ApiNotFoundResponse({
    type: SearchMovieResponse,
    description: 'No movies found with the specied parameters',
  })
  public getMovies(@Query() searchQuery: MovieSearchQuery) {
    const result = this.movies.searchMovies(searchQuery);
    if (!result.total) {
      throw new NotFoundException(result);
    }
    return result;
  }

  @ApiOperation({
    operationId: 'getMovieById',
    description: 'Returns a movie by id',
  })
  @Get('/:movieId')
  @ApiOkResponse({
    type: Movie,
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'The selected movie is not found',
  })
  @ApiParam({
    name: 'movieId',
    type: Number,
    description: 'movieId to be found',
  })
  public getMovieById(
    @Param(
      'movieId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })
    )
    movieId: Movie['id']
  ) {
    const movie = this.movies.getMovie(movieId);
    if (!movie) {
      throw new NotFoundException('movie not found');
    }
    return movie;
  }

  @ApiOperation({
    operationId: 'addMovie',
    description: 'Adds a new movie to the list',
  })
  @ApiOkResponse({ type: Movie })
  @ApiBody({ type: RawMovie })
  @ApiBadRequestResponse({
    description: 'Invalid movie data is entered',
  })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Post()
  public addMovie(@Body() movie: RawMovie) {
    return this.movies.addMovie(movie);
  }

  @ApiOperation({
    operationId: 'updateMovie',
    description: 'Updates an existing movie',
  })
  @ApiOkResponse({ type: Movie })
  @ApiBody({ type: Movie })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Put()
  public updateMovie(@Body() movie: Movie) {
    const result = this.movies.updateMovie(movie);
    if (!result) {
      throw new BadRequestException(
        `The selected movie with id "${movie.id}" does not exists`
      );
    }
    return result;
  }

  @ApiOperation({
    operationId: 'deleteMovie',
    description: 'Removes a movie from database',
  })
  @ApiParam({
    name: 'movieId',
    type: Number,
    description: 'movieId to be removed',
  })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Delete('/:movieId')
  public deleteMovie(
    @Param(
      'movieId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })
    )
    movieId: Movie['id']
  ) {
    if (!this.movies.removeMovie(movieId)) {
      throw new NotFoundException('movie not found');
    }
  }
}
