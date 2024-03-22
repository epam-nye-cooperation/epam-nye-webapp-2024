import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
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
    summary: 'Keresés',
    description: 'Keresés a filmek között típus, leírás és cím alapján, eredmények rendezése és lapozás',
  })
  @Get()
  @ApiOkResponse({
    type: SearchMovieResponse,
  })
  @ApiBadRequestResponse({
    description: 'Hibás keresési paraméterek'
  })
  public getMovies(@Query() searchQuery: MovieSearchQuery) {
    return this.movies.searchMovies(searchQuery);
  }

  @ApiOperation({
    operationId: 'getMovieById',
    summary: 'Film elérése',
    description: 'Visszaadja az adott azonosítóval rendelkező filmet',
  })
  @Get('/:movieId')
  @ApiOkResponse({
    type: Movie,
  })
  @ApiBadRequestResponse({
    description: 'Hibás azonosító'
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'A keresett film nem található',
  })
  @ApiParam({
    name: 'movieId',
    type: Number,
    description: 'A keresett film azonosítója',
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
      throw new NotFoundException('A film nem található');
    }
    return movie;
  }

  @ApiOperation({
    operationId: 'addMovie',
    summary: 'Új film hozzáadása',
    description: 'Új film rögzítése a listában',
  })
  @ApiCreatedResponse({ type: Movie, description: 'A film sikeresen rögzítve' })
  @ApiBody({ type: RawMovie })
  @ApiBadRequestResponse({
    description: 'Érvénytelen adatok',
  })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Post()
  public addMovie(@Body() movie: RawMovie) {
    return this.movies.addMovie(movie);
  }

  @ApiOperation({
    operationId: 'updateMovie',
    summary: 'Filmadat módosítása',
    description: 'Film adatainak módosítása',
  })
  @ApiOkResponse({ type: Movie })
  @ApiNotFoundResponse({
    description: 'A film nem található'
  })
  @ApiUnauthorizedResponse({
    description: 'Csak belépett felhasználók részére elérhető'
  })
  @ApiBadRequestResponse({ description: 'Hibás film adatok' })
  @ApiBody({ type: Movie })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Put()
  public updateMovie(@Body() movie: Movie) {
    const result = this.movies.updateMovie(movie);
    if (!result) {
      throw new NotFoundException(
        `Nem található film ezzel az azonosítóval: "${movie.id}"`
      );
    }
    return result;
  }

  @ApiOperation({
    operationId: 'deleteMovie',
    summary: 'Film törlése',
    description: 'Film eltávolítása az adatbázisból',
  })
  @ApiParam({
    name: 'movieId',
    type: Number,
    description: 'A film azonosítója',
    example: '933131',
  })
  @ApiNotFoundResponse({
    description: 'A film nem található'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Sikeresen törölve' })
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
      throw new NotFoundException('A keresett film nem található');
    }
  }
}
