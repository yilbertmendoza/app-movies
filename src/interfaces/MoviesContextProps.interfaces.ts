import type { Movie } from "./Movie.interfaces";
import type { ReponseInterface } from "./Response.interface";

export interface MoviesContextProps {
  movies: Movie[];
  loadingMovie: boolean;
  loadingMovies: boolean;
  getSingleMovie: (id: number | null) => Promise<Movie | null>;
  searchMovies: (title:string | null) => Promise<Movie[] | undefined>;
  orderByMovies: (sort:string | null) => Promise<Movie[] | undefined>;
  onRegisterMovie: (movie: Movie) => Promise<ReponseInterface>;
  onEditMovie: (movie: Movie) => Promise<ReponseInterface>;
  onToggleFavorite: (id: number | null) => Promise<ReponseInterface>;
  onRemoveMovie: (id: number | null) => Promise<ReponseInterface>;
}