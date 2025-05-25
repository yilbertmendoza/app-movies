import { useNavigate } from "react-router";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <button className='button' onClick={() => navigate(-1)}>
      Regresar
    </button>
  )
}

export default ButtonBack;