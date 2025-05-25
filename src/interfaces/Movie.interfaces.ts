export interface Movie {
  id: number | null;
  title: string;
  year: string;
  poster: string;
  isFavorite: boolean;
}

export interface getSingleMovie {
  (id: number | null): Promise<Movie | null>;
}

export interface getAllMovies {
  (): Promise<Movie[]>;
}
