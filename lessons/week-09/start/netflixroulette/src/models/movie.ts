import { Genre } from "./genre";

export interface Movie {
  id?: number;
  title: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  release_date: Date;
  poster_path: string;
  overview: string;
  budget?: number;
  revenue?: number;
  genres?: Genre[];
  runtime: number;
}
