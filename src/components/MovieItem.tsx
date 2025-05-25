import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { MovieItemProps } from "../interfaces/MovieItemProps.interfaces";

function MovieItem({ movie, onToggleFavorite, onRemoveMovie }: MovieItemProps) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <li className={`movie-item ${movie.isFavorite ? 'favorite' : ''}`}>
      <div className="img-card iCard-style">
          <div className="card-content">
            <div className="card-image">
              { movie.poster && (<img src={movie.poster} />) }
            </div>
          </div>
          
          <div className="card-link">
            <span className="card-title"> {movie.title} </span>
            <div className='card-text'>
              <p> Año: {movie.year} </p>
            </div>
            <div 
              className='onToggleMovie'
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? '<' : '>'}
            </div>
            {toggle && (<div>
              <button
                className="button" 
                style={{ width: '100%', margin: '2px' }}
                onClick={() => onToggleFavorite(movie.id)}
              >
                { 
                  movie.isFavorite 
                    ? 'Quitar de favoritos' 
                    : 'Marcar como favorito'
                }
              </button>
              <button 
                className="button" 
                style={{ width: '100%', margin: '2px' }}
                onClick={() => navigate(`/${movie.id}/editar`)}
              >
                Editar
              </button>
              <button 
                className="button" 
                style={{ width: '100%', margin: '2px' }}
                onClick={() => onRemoveMovie(movie.id)}
              >
                Eliminar
              </button>
            </div>
            )}
          </div>
      </div>
    </li>
  )
}

export default MovieItem;