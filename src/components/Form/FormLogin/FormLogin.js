import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import "./formLogin.css"
import BasicInput from '../../Shared/BasicInput/BasicInput'
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import TokenContext from '../../Context/TokenContext/TokenContext';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';
import Modal from '../../Shared/Modal/Modal';

const FormLogin = () => {

  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const navigate = useNavigate();

  const { updateToken } = useContext(TokenContext);

  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [validInput, setValidInput] = useState({
    email: null,
    password: null,
  });

  const [input, setInput] = useState({
    email: '',
    password: '',
    userType: ''
  });

  const handlerChangeInput = (e) => {
    if (e.target.name === "email") {
      setInput({ ...input, [e.target.name]: e.target.value });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handlerBlurInput = (e) => {

    const eventTarget = e.target.name;
    setValidInput({
      ...validInput,
      [eventTarget]: input[eventTarget] ? true : false,
    });

  }

  const submit = () => {
    const url = 'https://university-labor-exchange.azurewebsites.net/api/Authentication/Authenticate';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    setLoading(true);


    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.text();
      })
      .then(data => {

        const jwtToken = data;

        updateToken(jwtToken);

        setLoading(false);

        setInput({
          email: '',
          password: '',
        });

        navigate('/profile');
        login();

      })
      .catch(error => {
        setLoading(false);
        setModal({
          modalOpen: true,
          modalTitle: "Error en la solicitud",
          modalMessage: "El usuario ingresado no existe, compruebe sus datos",
        });

      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: "Complete correctamente los datos.",
      });
    } else {
      submit();
    }
  }

  return (
    <div className='formLogin-container'>
      {loading && <Spinner />}
      <p className='title-formLogin'>Iniciar sesión</p>
      <form className='formLogin-box'>
        <BasicInput
          inputName={"Email:"}
          name={"email"}
          placeholder="example@gmail.com"
          type={"email"}
          event={handlerChangeInput}
          onBlur={handlerBlurInput}
          validInput={validInput}
          errorMessage={"Este campo es requerido"}
          position="right"
        />
        <BasicInput
          inputName={"Contraseña:"}
          name={"password"}
          placeholder="*********"
          type={"password"}
          event={handlerChangeInput}
          onBlur={handlerBlurInput}
          validInput={validInput}
          errorMessage={<><p><FontAwesomeIcon icon={faTriangleExclamation} /> Este campo es requerido</p></>}
          position="left"
        />
      </form>
      <BasicButton buttonName={"Iniciar sesión"} buttonHandler={submitHandler} />
      {modal.modalOpen && (
        <Modal
          title={modal.modalTitle}
          message={modal.modalMessage}
          onClose={() => setModal({ modalOpen: false })}
        />
      )}
    </div>
  )
}

export default FormLogin;