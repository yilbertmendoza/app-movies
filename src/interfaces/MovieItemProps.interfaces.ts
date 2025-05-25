import type { Movie } from "./Movie.interfaces";

export interface MovieItemProps {
  movie: Movie;
  onToggleFavorite: (id: number | null) => Promise<void>;
  onRemoveMovie: (id: number | null) => Promise<void>;
}