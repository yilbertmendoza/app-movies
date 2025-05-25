import { useState, type FormEvent } from 'react';
import '../assets/movies/movieCreate.css';
import { useMovieContext } from "../contexts/Movie.context";
import ButtonBack from '../components/ButtonBack';
import ImageUploader from '../components/ImageUploader';
import AlertMessage from '../components/AlertMessage';
import type { Movie } from '../interfaces/Movie.interfaces';
import type { AlertMessageInterface } from '../interfaces/AlertMessage.interface';
import type { ReponseInterface } from '../interfaces/Response.interface';

function MoviesView() {
  const [poster, setPoster] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { onRegisterMovie } = useMovieContext();
  const [dAlertMessage, setDAlertMessage] = useState<AlertMessageInterface>({
    type: '',
    message: '',
    show: false
  });

  const resetForm = () => {
    setPoster('');
    setTitle('');
    setYear('');
    setIsFavorite(false);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const movie: Movie = {
      id: 0,
      title,
      year,
      poster,
      isFavorite
    }
    const response: ReponseInterface = await onRegisterMovie(movie);
    setDAlertMessage({ 
      message: response.message, 
      type: response.status, 
      show: true 
    })
    resetForm();
  }

  return (
    <div className="movie-container">
      <h1 className='title'>Crear película</h1>
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
          <button className='button' onClick={resetForm} type='button'>Limpiar</button>
          <button className='button' type='submit'>Guardar</button>
        </div>
      </form>      
    </div>
  )
}

export default MoviesView;