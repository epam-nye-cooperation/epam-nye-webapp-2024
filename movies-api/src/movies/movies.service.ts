import {
  Injectable,
  Logger,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Configuration } from '../app.configuration';
import { Movie, RawMovie } from './models';
import {
  MovieSearchQuery,
  SearchMovieResponse,
  findByGenre,
  searchMovie,
  sortMovies,
} from './search';

const DB_PATH = resolve(__dirname, '../data/movies.json');

@Injectable()
export class MovieService implements OnModuleInit {
  private readonly logger = new Logger(MovieService.name);
  private movies: Movie[] = [];

  constructor(private config: ConfigService<Configuration>) {}

  async onModuleInit() {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      this.movies = JSON.parse(data).map((rawMovie) => {
        return Object.keys(rawMovie).reduce((movie, key) => {
          movie[key] = rawMovie[key];
          return movie;
        }, new Movie());
      });
    } catch (error) {
      this.logger.error({
        message: `Cannot load database '${DB_PATH}': ${error.message}`,
        error,
      });
      throw new InternalServerErrorException('Loading movies failed');
    }
  }

  public searchMovies(query: MovieSearchQuery): SearchMovieResponse {
    try {
      const { offset, limit, search } = query;
      const results = searchMovie(
        findByGenre(this.movies, query.genres),
        search
      );
      return {
        total: results.length,
        data: sortMovies(results, query).slice(offset, offset + limit),
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Search failed');
    }
  }

  public getMovie(movieId: Movie['id']): Movie {
    return this.movies.find((movie) => movie.id === movieId);
  }

  public addMovie(movie: RawMovie): Movie {
    const result = Object.keys(movie).reduce((resultMovie, key) => {
      resultMovie[key] = movie[key];
      return resultMovie;
    }, new Movie());
    result.id =
      Math.max(...this.movies.map((movie) => movie.id)) +
      Math.ceil(Math.random() * 100);
    this.movies.push(result);
    this.saveDatabase();
    return result;
  }

  public updateMovie(movie: Movie): Movie {
    const index = this.movies.findIndex((m) => m.id === movie.id);
    if (index < 0) {
      return null;
    }
    this.movies = [
      ...this.movies.slice(0, index - 1),
      movie,
      ...this.movies.slice(index, this.movies.length),
    ];
    this.saveDatabase();
    return movie;
  }

  public removeMovie(movieId: Movie['id']) {
    const index = this.movies.findIndex((movie) => movie.id === movieId);
    if (index < 0) {
      this.logger.warn(`Cannot remove movie with id "${movieId}"`);
      return null;
    }
    const [removed] = this.movies.splice(index, 1);
    this.saveDatabase();
    return removed;
  }

  private async saveDatabase(override = false) {
    if (!this.config.get('AUTO_SAVE') && !override) {
      return;
    }
    try {
      await writeFile(DB_PATH, JSON.stringify(this.movies, null, 2));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
