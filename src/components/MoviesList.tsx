import MovieItem from "./MovieItem";
import type { MoviesListProps } from "../interfaces/MoviesListProps.interfaces";

function MoviesList({
  movies,
  onToggleFavorite,
  onRemoveMovie
}: MoviesListProps) {

  return (
    <div className='card-category'>
      <ul>
        {
          movies && movies.length === 0 
            ? <h3>No hay películas añadidas</h3>
            : movies && movies.map(movie => (
              <MovieItem 
                key={movie.id}
                movie={movie}
                onToggleFavorite={onToggleFavorite}
                onRemoveMovie={onRemoveMovie}
              />
            ))
        }
      </ul>
    </div>
  )
}

export default MoviesList;