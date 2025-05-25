import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect,
    ReactNode,
    useCallback
} from 'react';
import type { Movie } from "../interfaces/Movie.interfaces";
import type { MoviesContextProps } from '../interfaces/MoviesContextProps.interfaces';
import { fetchMovie, fetchMovies } from '../apis/Movie.api';

const MovieContext = createContext<MoviesContextProps | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

// validar los campos del formulario de registro y editar
const validateForm = (payload: Movie) => {
  let response = ''
  if (!payload.id) {
    response = 'El campo id es requerido'
  } else if (
    payload.title === '' 
    || payload.title === null
  ) {
    response= 'El campo título es requerido';
  } else if (
    payload.year === ''
    || payload.title === null
  ) {
    response= 'El campo año es requerido';
  } else if (!Number(payload.year)) {
    response= 'El campo año es debe ser numérico';
  }
  return response
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const storedMovies = localStorage.getItem('favoriteMovie')
    if (storedMovies) {
      try {
        return JSON.parse(storedMovies) as Movie[];
      } catch (error) {
        console.log("Error al parsear las películas de localstorage", error);
        return [];
      }
    }
    return [];
  });
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);
  // buscar película por id
  const getSingleMovie = useCallback(async (id: number | null) => {
    setLoadingMovie(true);
    try {
      return await fetchMovie(id);
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoadingMovie(false);
    }
  }, []);
  // listar las películas
  const searchMovies = useCallback(async (title: string | null) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingMovies(true);
    try {
      const moviesTemp = await fetchMovies();
      if (!title) {
        return moviesTemp
      }else {
        return moviesTemp.filter(f => {
          return f.title
            .toLowerCase()
            .includes(title.toLowerCase())
        });
      }
    } catch (err) {
      console.error({errorSearchMovies: err});
      return []
    } finally {
      setLoadingMovies(false);
    }
  }, []);
  // ordenar las peliculas por año asc o desc
  const orderByMovies = useCallback(async (sort: string | null) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingMovies(true);
    try {
      const moviesTemp = await fetchMovies();
      return moviesTemp?.sort((a, b) => {
        return sort === 'desc' 
          ? b.year.localeCompare(a.year) 
          : a.year.localeCompare(b.year);
      });
    } catch (err) {
      console.error({errorOrderByMovies: err});
      return []
    } finally {
      setLoadingMovies(false);
    }
  }, []);
  // registrar película
  const onRegisterMovie = async(payload: Movie) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      const movie = {
        ...payload,
        id: (movies[movies.length - 1]?.id ?? 0) + 1, 
      }
      const validateResponse = validateForm(movie);
      if (validateResponse) {
        return {
          status: 'warning', 
          message: validateResponse 
        }
      }
      setMovies((prevMovie) => { return [...prevMovie, movie] });
      return {
        status: 'success',
        message: 'Se registró la película con éxito'
      }
    } catch (error) {
      console.error({ errorOnRegisterMovie: error });
      return {
        status: 'error',
        message: 'Hubo un error al registrar película'
      }
    }
  };
  // editar película
  const onEditMovie = async(payload: Movie) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      const validateResponse = validateForm(payload);
      if (validateResponse) {
        return {
          status: 'warning', 
          message: validateResponse 
        }
      }
      
      setMovies((prevTheme) => {
        return prevTheme.map((item: Movie) => {
          return item.id === payload.id 
            ? payload
            : item
        })
      });

      return {
        status: 'success',
        message: 'Se editó la película con éxito'
      }
    } catch (error) {
      console.error({ errorOnEditarMovie: error });
      return {
        status: 'error',
        message: 'Hubo un error al editar película'
      }
    }
  };
  // seleccionar pelicula favorita o quitar
  const onToggleFavorite = async(id: number | null) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      const movieTemp: Movie | undefined = movies.find(f => f.id === id);
      setMovies((prevTheme) => {
        return prevTheme.map((item: Movie) => {
          return item.id === id 
            ? { ...item, isFavorite: !item.isFavorite } 
            : item
        })
      });
      return {
        status: 'success',
        message: `Se ${movieTemp?.isFavorite ? 'quitó de' : 'marcó como'} favorito la película con éxito`
      }
    } catch (error) {
      console.log({ errorOnToggleFavorite: error });
      return {
        status: 'error',
        message: 'Hubo un error al actualizar de favorito película'
      }
    }
  };
  // eliminar película al id recibida
  const onRemoveMovie = async(id: number | null) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      if (movies.length) {
        setMovies(movies.filter(f => f.id !== id));
      }
      return {
        status: 'success',
        message: 'Se eliminó la película con éxito'
      }
    } catch (error) {
      console.error({ errorOnRegisterMovie: error });
      return {
        status: 'error',
        message: 'Hubo un error al registrar película'
      }
    }
  };
  // almacenar en localstorage favoriteMovie
  useEffect(() => {
    localStorage.setItem('favoriteMovie', JSON.stringify(movies))
  }, [movies])

  // El valor que provee el contexto
  const contextValue: MoviesContextProps = {
    movies,
    loadingMovie,
    loadingMovies,
    getSingleMovie,
    searchMovies,
    orderByMovies,
    onRegisterMovie,
    onEditMovie,
    onToggleFavorite,
    onRemoveMovie
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MoviesContextProps => {
  const context = useContext(MovieContext);
  return context;
};
