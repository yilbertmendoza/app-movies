import type { Movie } from "./Movie.interfaces";

export interface MoviesListProps {
  movies: Movie[] | undefined;
  onToggleFavorite: (id: number | null) => Promise<void>;
  onRemoveMovie: (id: number | null) => Promise<void>;
}