import React, { useState } from 'react'
import "./formLogin.css"
import BasicInput from '../../Shared/BasicInput/BasicInput'
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../Shared/BasicButton/BasicButton';


// FIXME: sacar validaciones del password 

const FormLogin = () => {

  const navigate = useNavigate();

  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const regex = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  };

  const [validInput, setValidInput] = useState({
    email: null,
    password: null,
  });

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handlerChangeInput = (e) => {
    if (e.target.name === 'password') {
      setInput({ ...input, [e.target.name]: e.target.value });
      const passwordValue = e.target.value;
      const isValid = regex.password.test(passwordValue);
      setValidInput({ ...validInput, [e.target.name]: isValid });

      // Actualizar los mensajes de error específicos
      setPasswordErrors({
        uppercase: !/[A-Z]/.test(passwordValue),
        lowercase: !/[a-z]/.test(passwordValue),
        number: !/\d/.test(passwordValue),
      });

    } else {
      setInput({ ...input, [e.target.name]: e.target.value.toLowerCase() });
    }
  };

  const handlerBlurInput = (e) => {

    const eventTarget = e.target.name;

    setValidInput({
      ...validInput,
      [eventTarget]: regex[eventTarget].test(input[eventTarget])
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

      navigate('/');
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
          errorMessage={
            "Email invalido: respete el formato (example@gmail.com)"
          } />
        <BasicInput
          inputName={"Contraseña:"}
          name={"password"}
          placeholder="*********"
          type={"password"}
          event={handlerChangeInput}
          onBlur={handlerBlurInput}
          validInput={validInput}
          errorMessage={
            <>
              {passwordErrors.uppercase && (
                <div>Debe incluir una mayúscula.</div>
              )}
              {passwordErrors.lowercase && (
                <div>Debe incluir una minúscula.</div>
              )}
              {passwordErrors.number && (
                <div>Debe contener un número.</div>
              )}
            </>
          }
        />
      </form>
      <BasicButton buttonName={"Iniciar sesión"} buttonHandler={submitHandler}/>
    </div>
  )
}

export default FormLogin;