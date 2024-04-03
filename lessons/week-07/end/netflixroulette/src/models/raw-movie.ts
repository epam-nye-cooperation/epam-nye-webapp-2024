import { Movie } from "./movie";

export interface RawMovie extends Omit<Movie, "release_date"> {
  release_date: string;
}
