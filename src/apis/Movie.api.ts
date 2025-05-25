import type { 
  Movie, 
  getSingleMovie, 
  getAllMovies,
} from '../interfaces/Movie.interfaces';

export const fetchMovie: getSingleMovie = async (id: number | null) => {
  console.log(`Buscando película con ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const storedMovies = localStorage.getItem('favoriteMovie');
  let movie = null
  if (storedMovies) {
    const storedMoviesTemp = JSON.parse(storedMovies) as Movie[];
    movie = storedMoviesTemp.find(f => f.id === id);
  }
  return movie || null;
};

export const fetchMovies: getAllMovies = async () => {
  console.log("Buscando todas las películas...");
  await new Promise(resolve => setTimeout(resolve, 800));
  const storedMovies = localStorage.getItem('favoriteMovie');
  if (storedMovies) {
    try {
      return JSON.parse(storedMovies) as Movie[];
    } catch (error) {
      console.log("Error al parsear las películas de localstorage", error);
      return [];
    }
  }else {
    return [];
  }
};
