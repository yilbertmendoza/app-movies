import type { Movie } from "./Movie.interfaces";

export interface AppContextInterface {
  movies: Movie[];
  onToggleFavorite: (id: number) => void;
  onRemoveMovie: (id: number) => void;
}