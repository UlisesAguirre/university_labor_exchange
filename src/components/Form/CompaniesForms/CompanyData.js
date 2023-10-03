
import useFrom from "../../../custom/useForm"
import BasicButton from "../../Shared/BasicButton/BasicButton";

const validateData = (data, name) => {
  let error = '';

  if (!data[name].trim()) {
    if (validInputs[name].require) {
      error = "Este campo es obligatorio";
    }
  } else {
    if (validInputs[name].regex) {
      if (!validInputs[name].regex.test(data[name])) {
        if (name === 'legalAddress') {
          error = "El campo solo debe aceptar caracteres alfanuméricos y tener una longitud máxima de 50 caracteres.";
        }
        if (name === 'companyName' || name === 'location' || name === 'sector' || name === 'socialReason') {
          error = "El campo solo debe aceptar caracteres del alfabeto español y tener una longitud mínima de 3 y máxima de 50 caracteres.";
        }
        if (name === 'cuit') {
          error = 'El cuit debe contener guiones';
        }
        if (name === 'telephoneNumber') {
          error = "El número de telefono puede contener opcionalmente el caracter + al comienzo y debe tener un máximo 10 dígitos";
        }
        if (name === 'postalCode') {
          error = 'El codigo postal solo acepta un número de 4 digítos';
        }
        if (name === 'web') {
          error = 'La web debe respetar el formato http://example.com ';
        }

      }
    }
  }
  return error;
}

const validInputs = {
  companyName: { regex: /^[a-zA-Z]{3,50}$/, require: true },
  cuit: { 
    //regex: /^\d{2}-\d{8}-\d$/, 
  require: true },
  telephoneNumber: { regex: /^\+?[1-9]\d{10}$/, require: true },
  sector: { regex: /^[a-zA-Z]{3,50}$/, require: true },
  legalAddress: { regex: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]{3,50}\s\d+$/, require: true },
  postalCode: { regex: /^\d{4}$/, require: true },
  web: { regex: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ },
  location: { regex: /^[a-zA-Z]{3,50}$/, require: true },
  socialReason: { regex: /^[a-zA-Z\s]{3,50}$/, require: true },
}

const CompanyData = ({ stepForwardHandler, form }) => {

  const inicialData = {
    companyName: form.companyName,
    cuit: form.cuit,
    telephoneNumber: form.telephoneNumber,
    sector: form.sector,
    legalAddress: form.legalAddress,
    postalCode: form.postalCode,
    web: form.web,
    location: form.location,
    socialReason: form.socialReason,
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
  } = useFrom({ inicialData, validateData, stepForwardHandler })


  return (
    <div>
      <h2>Datos de la empresa</h2>

      <div>

        <label> Nombre de la Empresa * </label>
        <input type='text' name="companyName" placeholder="Nombre" value={data.companyName} onChange={changeHandler} onBlur={blurHandler} />
        {errors.companyName && <div>{errors?.companyName}</div>}

        <label> Cuit </label>
        <input type='text' name="cuit" placeholder="00-000000000-0" value={data.cuit} onChange={changeHandler} onBlur={blurHandler} disabled />
        {errors.cuit && <div>{errors?.cuit}</div>}

        <label> Telefono </label>
        <input type='text' name="telephoneNumber" placeholder="3410000000" value={data.telephoneNumber} onChange={changeHandler} onBlur={blurHandler} />
        {errors.telephoneNumber && <div>{errors?.telephoneNumber}</div>}

        <label> Sector </label>
        <input type='text' name="sector" placeholder="Sector" value={data.sector} onChange={changeHandler} onBlur={blurHandler} />
        {errors.sector && <div>{errors?.sector}</div>}

        <label> Domicilio legal </label>
        <input type='text' name="legalAddress" placeholder="Sector" value={data.legalAddress} onChange={changeHandler} onBlur={blurHandler} />
        {errors.legalAddress && <div>{errors?.legalAddress}</div>}

        <label>Codigo Postal</label>
        <input type='text' name="postalCode" placeholder="Codigo Postal" value={data.postalCode} onChange={changeHandler} onBlur={blurHandler} />
        {errors.postalCode && <div>{errors?.postalCode}</div>}

        <label>Web</label>
        <input type='text' name="web" placeholder="Web" value={data.web} onChange={changeHandler} onBlur={blurHandler} />
        {errors.web && <div>{errors?.web}</div>}

        <label>Localidad</label>
        <input type='text' name="location" placeholder="Localidad" value={data.location} onChange={changeHandler} onBlur={blurHandler} />
        {errors.location && <div>{errors?.location}</div>}

        <label>Razón Social</label>
        <input type='text' name="socialReason" placeholder="Razón Social" value={data.socialReason} onChange={changeHandler} onBlur={blurHandler} />
        {errors.socialReason && <div>{errors?.socialReason}</div>}
      </div>

      <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
    </div>

  )
}

export default CompanyData
