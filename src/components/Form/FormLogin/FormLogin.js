import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import "./formLogin.css"
import BasicInput from '../../Shared/BasicInput/BasicInput'
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import TokenContext from '../../Context/TokenContext/TokenContext';
import UserContext from '../../Context/UserContext/UserContext';


// FIXME: sacar validaciones del password 

const FormLogin = () => {

  const navigate = useNavigate();

  const {updateToken} = useContext(TokenContext);

  const {login} = useContext(UserContext);

  const [validInput, setValidInput] = useState({
    email: null,
    password: null,
  });

  const [input, setInput] = useState({
    email: '',
    password: '',
    userType:''
  });

  const handlerChangeInput = (e) => {
    if (e.target.name === "email") {
      setInput({ ...input, [e.target.name]: e.target.value.toLowerCase() });
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
    const url = 'https://localhost:7049/api/authentication/authenticate';
  
    // Configurar la solicitud Fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };
  
    // solicitud Fetch a Authenticate
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.text();
      })
      .then(data => {
        //Esta variable tiene el token, ver de guardar en localstorage
        const jwtToken = data;

        updateToken(jwtToken);
        login();
  
        // Redirigimos 
        alert('Inicio de sesión exitoso');
        setInput({
          email: '',
          password: '',
        });
  
        navigate('/profile');
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        // Manejar errores aca
        alert('Error al iniciar sesión');
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      alert('Complete correctamente todos los campos');
    } else {
      submit();
      
    }
  }

  return (
    <div className='formLogin-container'>
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
      <BasicButton buttonName={"Iniciar sesión"} buttonHandler={submitHandler}/>
    </div>
  )
}

export default FormLogin;