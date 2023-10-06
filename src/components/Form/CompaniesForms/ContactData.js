import React from 'react'
import useFrom from '../../../custom/useForm';
import BasicButton from '../../Shared/BasicButton/BasicButton';

const validateData = (data, name) => {
  let error = '';

  if (data[name] ===  null || !data[name].trim())  {
    if (validInputs[name].require)  {
      error = "Este campo es obligatorio";
    }
  } else {
    if (validInputs[name].regex) {
      if (!validInputs[name].regex.test(data[name])) {

        if (name === 'recruiterName' || name === 'recruiterLastName' || name === 'recruiterPosition') {
          error = "El campo solo debe aceptar caracteres del alfabeto español y tener una longitud mínima de 3 y máxima de 50 caracteres.";
        }
        if (name === 'recruiterPhoneNumber') {
          error = "El número de telefono puede contener opcionalmente el caracter + al comienzo y debe tener un máximo 10 dígitos";
        }
        if (name === 'recruiterEmail') {
          error = 'El email debe respectar el formato example@gmail.com';
        }
      }
    }
  }
  return error;
}


const validInputs = {
  recruiterName: { regex: /^[a-zA-Z\s]{3,50}$/, require: true, },
  recruiterLastName: { regex: /^[a-zA-Z\s]{3,50}$/, require: true, },
  recruiterPosition: { regex: /^[a-zA-Z\s]{3,50}$/, require: true, },
  recruiterPhoneNumber: { regex: /^\+?[1-9]\d{9,10}$/, require: true, },
  recruiterEmail: { regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, require: true, },
  recruiterRelWithCompany: { require: true, },
}

const ContactData = ({ form, stepBackHandler, stepForwardHandler }) => {

  const inicialData = {
    recruiterName: form.recruiterName,
    recruiterLastName: form.recruiterLastName,
    recruiterPosition: form.recruiterPosition,
    recruiterPhoneNumber: form.recruiterPhoneNumber,
    recruiterEmail: form.recruiterEmail,
    recruiterRelWithCompany: form.recruiterRelWithCompany,
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveBackHandler,
    moveForwardHandler
  } = useFrom({ inicialData, validateData, stepBackHandler, stepForwardHandler})


  return (
    <div>
      <h2>Datos de Contacto</h2>

      <div>
        <label> Nombre * </label>
        <input type='text' name="recruiterName" placeholder="Nombre" value={data.recruiterName} onChange={changeHandler} onBlur={blurHandler} />
        {errors.recruiterName && <div>{errors?.recruiterName}</div>}

        <label> Apellido * </label>
        <input type='text' name="recruiterLastName" placeholder="Apellido" value={data.recruiterLastName} onChange={changeHandler} onBlur={blurHandler} />
        {errors.recruiterLastName && <div>{errors?.recruiterLastName}</div>}

        <label> Puesto/Cargo * </label>
        <input type='text' name="recruiterPosition" placeholder="Puesto" value={data.recruiterPosition} onChange={changeHandler} onBlur={blurHandler} />
        {errors.recruiterPosition && <div>{errors?.recruiterPosition}</div>}

        <label> Telefono * </label>
        <input type='text' name="recruiterPhoneNumber" placeholder="Telefono" value={data.recruiterPhoneNumber} onChange={changeHandler} onBlur={blurHandler} />
        {errors.recruiterPhoneNumber && <div>{errors?.recruiterPhoneNumber}</div>}

        <label> Email * </label>
        <input type='email' name="recruiterEmail" placeholder="example@gmail.com" value={data.recruiterEmail} onChange={changeHandler} onBlur={blurHandler} />
        {errors.recruiterEmail && <div>{errors?.recruiterEmail}</div>}


        <label>Relación del Contacto con la empresa</label>
        <select name='recruiterRelWithCompany' value={data.recruiterRelWithCompany} onChange={changeHandler} onBlur={blurHandler}>
          <option value={''}>Relación con la empresa</option>
          <option value={'EnEmpresa'}>Trabajo en la Empresa que solicita la Búsqueda</option>
          <option value={'EnConsultora'}>Trabajo para una consultora</option>
        </select>
        {errors.recruiterRelWithCompany && <div>{errors?.recruiterRelWithCompany}</div>}
      </div>

      <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
      <BasicButton buttonName={'Guardar'} buttonHandler={moveForwardHandler} />

    </div >
  )
}

export default ContactData
