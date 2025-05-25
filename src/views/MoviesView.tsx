import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import '../assets/movies/MovieView.css';
import { useMovieContext } from "../contexts/Movie.context";
import MoviesList from "../components/MoviesList";
import AlertMessage from '../components/AlertMessage';
import type { AlertMessageInterface } from '../interfaces/AlertMessage.interface';
import type { ReponseInterface } from '../interfaces/Response.interface';
import type { Movie } from '../interfaces/Movie.interfaces';

function MoviesView() {
  const navigate = useNavigate();
  const { 
    movies, 
    loadingMovies,
    onToggleFavorite, 
    onRemoveMovie,
    searchMovies,
    orderByMovies
  } = useMovieContext();
  const [moviesTemp, setMoviesTemp] = useState<Movie[] | undefined>(movies);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('asc');
  const [dAlertMessage, setDAlertMessage] = useState<AlertMessageInterface>({
    type: '',
    message: '',
    show: false
  });

  const orderByYear = async () => {
    const response: Movie[] | undefined = await orderByMovies(sort);
    setMoviesTemp(response);
  }

  const onSearch = async(e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setSearch(value);
    if (!value) {
      return setMoviesTemp(movies);
    }
    const response: Movie[] | undefined = await searchMovies(value);
    setMoviesTemp(response);
  }

  const handleRemoveMovie = async(id: number | null) => {
    const response: ReponseInterface = await onRemoveMovie(id);
    setDAlertMessage({ 
      message: response.message, 
      type: response.status, 
      show: true
    })
  }

  const handleToggleFavoriteMovie = async(id: number | null) => {
    const response: ReponseInterface = await onToggleFavorite(id);
    setDAlertMessage({
      message: response.message, 
      type: response.status, 
      show: true
    })
  }

  useEffect(() => {
    orderByYear();
  }, [sort]);

  return (
    <div className="app-container">
      <div>
        <h1 >Mis peliculas favoritas</h1>
        <AlertMessage 
          type={dAlertMessage.type}
          message={dAlertMessage.message} 
          show={dAlertMessage.show}
          onHide={() => setDAlertMessage({ ...dAlertMessage, show: false })}
        />
      </div>
      <div className='content-search'>
        <input
          type="text"
          placeholder="Buscar por nombre película"
          value={search}
          onChange={onSearch}
          className='input'
        />
        <button 
          className='button' 
          onClick={() => navigate('/create')}
        >
          Nuevo
        </button>
      </div>
      <div className='content-order'>
        <span>Ordenar por año: </span>
        <button 
          className='button' 
          onClick={() => {
            setSort(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
          }}
        >
          {sort}
        </button>
      </div>
      {
        loadingMovies
          ? (<h3>Cargando...</h3>)
          : (
            <MoviesList 
              movies={moviesTemp}
              onRemoveMovie={handleRemoveMovie}
              onToggleFavorite={handleToggleFavoriteMovie}
            />
          )
      }
    </div>
  )
}

export default MoviesView;