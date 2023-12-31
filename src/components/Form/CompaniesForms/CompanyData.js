
import { useContext } from "react";
import useFrom from "../../../custom/useForm"
import BasicButton from "../../Shared/BasicButton/BasicButton";

import "./companyData.css"
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

const validateData = (data, name) => {
  let error = '';

  if (data[name] === null || (typeof data[name] === 'string' && !data[name].trim())) {
    if (validInputs[name].require) {
      error = "Este campo es obligatorio";
    }
  } else {
    if (validInputs[name].regex) {
      if (!validInputs[name].regex.test(data[name])) {
        if (name === 'legalAddress') {
          error = "El campo solo debe aceptar caracteres alfanuméricos y tener una longitud máxima de 50 caracteres.";
        }
        if (name === 'username' || name === 'companyName' || name === 'location' || name === 'sector' || name === 'socialReason') {
          error = "El campo solo debe aceptar caracteres alfabeticos y debe tener una longitud minima de 3 caracteres y un máxima de 50 caracteres";
        }
        if (name === 'cuit') {
          error = 'El cuit debe contener guiones';
        }
        if (name === 'telephoneNumber') {
          error = "El número de teléfono puede comenzar opcionalmente con el caracter '+' y debe tener un máximo de 9 o 10 dígitos";
        }
        if (name === 'postalCode') {
          error = 'El codigo postal solo acepta un número de 4 digítos';
        }
        if (name === 'web') {
          error = 'La web debe respetar el formato http://example.com[.ar] o www.example.com[.ar] ';
        }
        if (name === 'email') {
          error = 'El email debe respectar el formato example@gmail.com';
        }

      }
    }
  }
  return error;
}

const validInputs = {
  companyName: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  socialReason: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ. ]{3,50}$/, require: true },
  cuit: { require: true },
  telephoneNumber: { regex: /^\+?[1-9]\d{9,10}$/, require: true },
  sector: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  legalAddress: { regex: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]{3,50}$/, require: true },
  postalCode: { regex: /^\d{4}$/, require: true },
  web: { regex: /^(https?:\/\/)?(www\.)?[\w-]+\.\w+(\.\w+)?$/, },
  location: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  username: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  email: { regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, require: true },
}

const CompanyData = ({ stepForwardHandler, form }) => {

  const { theme } = useContext(ThemeContext);

  const inicialData = {
    companyName: form.companyName,
    socialReason: form.socialReason,
    sector: form.sector,
    telephoneNumber: form.telephoneNumber,
    legalAddress: form.legalAddress,
    postalCode: form.postalCode,
    web: form.web,
    location: form.location,
    username: form.username,
    email: form.email
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
  } = useFrom({ inicialData, validateData, stepForwardHandler })


  return (
    <div className="companyData-container">
      <h2>Datos de la empresa</h2>
      <div className={`companyData-form ${theme}`}>

        <label> Nombre de usuario * </label>
        <input type='text' name='username' placeholder="La casona" value={data.username} onChange={changeHandler} onBlur={blurHandler} />
        {errors.username && <div className="form-user-error-message">{errors?.username}</div>}

        <label> Email *</label>
        <input className='input-form-disabled' readOnly disabled type="email" name="email" placeholder="example@gmail.com" value={data.email} onChange={changeHandler} onBlur={blurHandler} />
        {errors.email && <div className="form-user-error-message">{errors?.email}</div>}
        <span> El email no puede modificarse </span>

        <label>Nombre de la empresa *</label>
        <input type='text' name="companyName" placeholder="La casona" value={data.companyName} onChange={changeHandler} onBlur={blurHandler} />
        {errors.companyName && <div className="form-user-error-message">{errors?.companyName}</div>}

        <label>Razón Social *</label>
        <input type='text' name="socialReason" placeholder="La casona SA" value={data.socialReason} onChange={changeHandler} onBlur={blurHandler} />
        {errors.socialReason && <div className="form-user-error-message">{errors?.socialReason}</div>}

        <label> Cuit *</label>
        <input className='input-form-disabled' type='text' name="cuit" defaultValue={form.cuit} readOnly disabled />
        <span> El cuit no puede modificarse </span>

        <label> Telefono *</label>
        <input type='text' name="telephoneNumber" placeholder="3410000000" value={data.telephoneNumber} onChange={changeHandler} onBlur={blurHandler} />
        {errors.telephoneNumber && <div className="form-user-error-message">{errors?.telephoneNumber}</div>}

        <label> Sector *</label>
        <input type='text' name="sector" placeholder="Industrial" value={data.sector} onChange={changeHandler} onBlur={blurHandler} />
        {errors.sector && <div className="form-user-error-message">{errors?.sector}</div>}

        <label> Domicilio legal *</label>
        <input type='text' name="legalAddress" placeholder="Laprida 1200" value={data.legalAddress} onChange={changeHandler} onBlur={blurHandler} />
        {errors.legalAddress && <div className="form-user-error-message">{errors?.legalAddress}</div>}

        <label>Codigo Postal *</label>
        <input type='text' name="postalCode" placeholder="2000" value={data.postalCode} onChange={changeHandler} onBlur={blurHandler} />
        {errors.postalCode && <div className="form-user-error-message">{errors?.postalCode}</div>}

        <label>Web </label>
        <input type='text' name="web" placeholder="http://example.com" value={data.web} onChange={changeHandler} onBlur={blurHandler} />
        {errors.web && <div className="form-user-error-message">{errors?.web}</div>}

        <label>Localidad *</label>
        <input type='text' name="location" placeholder="Rosario" value={data.location} onChange={changeHandler} onBlur={blurHandler} />
        {errors.location && <div className="form-user-error-message">{errors?.location}</div>}

      </div>
      <div className='companyData-requerid-message'>
        <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
        <p className="requerid-camps-message">(*) Estos campos son obligatorios </p>
      </div>
    </div>

  )
}

export default CompanyData
