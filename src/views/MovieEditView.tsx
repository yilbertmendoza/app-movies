import { useState, type FormEvent, useEffect } from 'react';
import { useParams } from "react-router";
import '../assets/movies/movieCreate.css';
import { useMovieContext } from "../contexts/Movie.context";
import ButtonBack from '../components/ButtonBack';
import ImageUploader from '../components/ImageUploader';
import AlertMessage from '../components/AlertMessage';
import type { Movie } from '../interfaces/Movie.interfaces';
import type { AlertMessageInterface } from '../interfaces/AlertMessage.interface';
import type { ReponseInterface } from '../interfaces/Response.interface';

function MoviesView() {
  const params = useParams();
  const { getSingleMovie, onEditMovie } = useMovieContext();
  const [poster, setPoster] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [dAlertMessage, setDAlertMessage] = useState<AlertMessageInterface>({
    type: '',
    message: '',
    show: false
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = params?.id ? parseInt(params?.id) : null;
    const movieTemp: Movie = {
      id,
      title,
      year,
      poster,
      isFavorite
    }
    const response: ReponseInterface = await onEditMovie(movieTemp);
    setDAlertMessage({ 
      type: response.status,
      message: response.message,
      show: true 
    })
  }

  const fetchData = async () => {
    const id = params?.id ? parseInt(params?.id) : null;
    if(id) {
      const movie = await getSingleMovie(id);
      setTitle(movie?.title ?? '');
      setYear(movie?.year ?? '');
      setPoster(movie?.poster ?? '');
      setIsFavorite(movie?.isFavorite ?? false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [params?.id])

  return (
    <div className="movie-container">
      <h1 className='title'>Editar película</h1>
      <AlertMessage 
        type={dAlertMessage.type}
        message={dAlertMessage.message} 
        show={dAlertMessage.show}
        onHide={() => setDAlertMessage({ ...dAlertMessage, show: false })}
      />
      <form onSubmit={handleSubmit}>
        <div className='form-input'>
          <ImageUploader 
            base64StringProp={poster}
            onSelectedImage={(base64String: string) => setPoster(base64String)} 
          />
        </div>
        <div className='form-input' style={{ textAlign: 'center' }}>
          <p>Favorita</p>
          <input
            type="checkbox"
            onChange={(e) => setIsFavorite(e.target.checked)}
            checked={isFavorite}
          />
        </div>
        <div className='form-input'>
          <p>Titulo</p>
          <input
            type="text"
            placeholder="Digite título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input'
          />
        </div>
        <div className='form-input'>
          <p>Año</p>
          <input
            type="number"
            placeholder="Digite año de estreno"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='input'
          />
        </div>
        <div className='btn-function'>
          <ButtonBack />
          <button className='button' type='submit'>Guardar</button>
        </div>
      </form>      
    </div>
  )
}

export default MoviesView;