import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import "./formLogin.css"
import BasicInput from '../../Shared/BasicInput/BasicInput'
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {

  const navigate = useNavigate();

  const [validInput, setValidInput] = useState({
    email: null,
    password: null,
  });

  const [input, setInput] = useState({
    email: '',
    password: '',
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

  const submitHandler = (e) => {
    e.preventDefault();
    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      alert('Complete correctamente todos los campos');
    } else {
      alert('Inicio de sesion exitoso');
      setInput({
        email: '',
        password: '',
      });

      navigate('/profile');
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
      <button className="button" onClick={submitHandler}>
        Iniciar sesión
      </button>
    </div>
  )
}

export default FormLogin;