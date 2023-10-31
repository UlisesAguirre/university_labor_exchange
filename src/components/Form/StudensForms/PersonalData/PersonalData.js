import { differenceInYears, format } from 'date-fns';

import useFrom from "../../../../custom/useForm"
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import Spinner from "../../../Shared/Spinner/Spinner"
import Error from "../../../Shared/Error/Error"

import "./personalData.css"
import { useContext } from 'react';
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext"
import useGet from '../../../../custom/useGet';


const validateData = (data, name) => {

  let error = '';

  if (data[name] === null || (typeof data[name] === 'string' && !data[name].trim())) {
    if (validInputs[name].require) {
      error = "Este campo es obligatorio";
    }
  } else {
    if (validInputs[name].regex) {
      if (!validInputs[name].regex.test(data[name])) {
        if (name === 'username' || name === 'name' || name === 'lastName' || name === 'address' || name === 'city' || name === 'province' || name === 'country') {
          error = "El campo solo debe aceptar caracteres del alfabeto español o ingles y tener una longitud máxima de 50 caracteres.";
        }
        if (name === 'birthDate') {
          error = "La fecha debe tener formato dd/mm/yyyy"
        }
        if (name === 'documentNumber') {
          error = "El número de documento debe ingresarse sin puntos y tener una longitud de 6 o 7 números";
        }
        if (name === 'cuil') {
          error = 'El cuit debe contener guiones';
        }
        if (name === 'addressNumber') {
          error = "El valor de la calle debe estar dentro del rango de 0 a 10.000 y puede incluir opcionalmente la palabra 'bis'";
        }
        if (name === 'floor') {
          error = "El piso solo puede contener una letra o número del 1 al 20";
        }
        if (name === 'telephoneNumber') {
          error = "El número de teléfono puede comenzar opcionalmente con el caracter '+' y debe tener un máximo de 9 o 10 dígitos";
        }
        if (name === 'email') {
          error = 'El email debe respectar el formato example@gmail.com';
        }
      }
    }
    if (name === 'birthDate') {
      const date = differenceInYears(new Date(), new Date(data[name]));
      if (date < 17) {
        error = 'Debe ser mayor a 17 años'
      }
    }
  }

  return error;
}

const validInputs = {
  username: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  name: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  lastName: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
  email: { regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, require: true },
  legajo: { require: true },
  documentType: { require: true },
  documentNumber: { regex: /^[1-9]\d{6,7}$/, require: true },
  birthDate: { regex: /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/, require: true },
  civilStatus: { require: true },
  cuil: { regex: /^(20|23|24|27)-\d{8}-\d$/, require: true, },
  sex: { require: true },
  address: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: false, },
  addressNumber: { regex: /^(?:[1-9]\d{0,3}|10000)?(?: bis)?$/, require: false },
  floor: { regex: /^(0|1?\d|20|)$/, require: false },
  city: {
    regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/,
    require: false
  },
  province: {
    regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/,
    require: false
  },
  country: {
    regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/,
    require: false
  },
  telephoneNumber: { regex: /^\+?[1-9]\d{9,10}$/, require: true },

}


const FormPersonalData = ({ form, stepForwardHandler }) => {

  const provinces  = useGet('https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&campos=id, nombre')

  

  const { theme } = useContext(ThemeContext);

  const inicialData = {
    username: form.username,
    name: form.name,
    lastName: form.lastName,
    email: form.email,
    legajo: form.legajo,
    documentType: form.documentType,
    documentNumber: form.documentNumber,
    birthDate: form.birthDate ? format(new Date(form.birthDate), 'yyyy-MM-dd') : null,
    civilStatus: form.civilStatus,
    cuil: form.cuil,
    sex: form.sex,
    address: form.address,
    addressNumber: form.addressNumber,
    floor: form.floor,
    city: form.city,
    province: form.province,
    country: form.country,
    telephoneNumber: form.telephoneNumber,
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
  } = useFrom({ inicialData, validateData, stepForwardHandler })


  return (
    <div className="personalData-form-container">
      {provinces.getLoading && <Spinner/>}
      {
        provinces.getError ?
          <Error error={provinces.getError} />
          :
          <>
            <h2>Datos Personales</h2>
            <div className={`personalData-form ${theme}`}>
              <div className='personalData-form-column'>
                <div>
                  <div className="input-content">
                    <label> Nombre de usuario * </label>
                    <input type='text' name='username' placeholder="MaríaPerez" value={data.username} onChange={changeHandler} onBlur={blurHandler} />
                  </div>
                  {errors.username && <div className="form-user-error-message">{errors?.username}</div>}
                </div>
                <div>
                  <div className="input-content">
                    <label> Email * </label>
                    <input className='input-form-disabled' readOnly disabled type="email" name="email" placeholder="example@gmail.com" value={data.email} onChange={changeHandler} onBlur={blurHandler} />
                    {errors.email && <div className="form-user-error-message">{errors?.email}</div>}
                    <span> El email no puede modificarse </span>
                  </div>
                </div>
                <div>
                  <div className="input-content">
                    <label> Nombres * </label>
                    <input type='text' name='name' placeholder="María" value={data.name} onChange={changeHandler} onBlur={blurHandler} />
                  </div>
                  {errors.name && <div className="form-user-error-message">{errors?.name}</div>}
                </div>
                <div>
                  <div className="input-content">
                    <label> Apellido * </label>
                    <input type='text' name='lastName' placeholder="Perez" value={data.lastName} onChange={changeHandler} onBlur={blurHandler} />
                  </div>
                  {errors.lastName && <div className="form-user-error-message">{errors?.lastName}</div>}
                </div>
                <div>
                  <div className="input-content">
                    <label> Legajo </label>

                    <input className='input-form-disabled' type='text' name='legajo' defaultValue={data.legajo} onChange={changeHandler} onBlur={blurHandler} readOnly disabled />
                    <span> El legajo no puede modificarse </span>
                  </div>
                </div>
                <div>
                  <div className="input-content">
                    <label> Cuil * </label>
                    <input type='text' name='cuil' placeholder="23-39580415-4" value={data.cuil} onChange={changeHandler} onBlur={blurHandler} />
                  </div>
                  {errors.cuil && <div className="form-user-error-message">{errors?.cuil}</div>}
                </div>


                <div className='personalData-document-container'>
                  <div className='input-content'>
                    <label>Tipo de documento * </label>
                    <select name='documentType' value={data.documentType} onChange={changeHandler} onBlur={blurHandler}>
                      <option value=''>Tipo de documento</option>
                      <option value='DocumentoUnico'>DNI</option>
                      <option value='LibretaCivica'>Libreta Civica</option>
                      <option value='LibretadeEnrolamiento'>Libreta de Enrolamiento</option>
                      <option value='Pasaporte'>Pasaporte</option>
                    </select>
                    {errors.documentType && <div className="form-user-error-message">{errors?.documentType}</div>}
                  </div>
                  <div className='input-content'>
                    <label>Número de documento * </label>
                    <input type='text' name='documentNumber' placeholder="39580415" value={data.documentNumber} onChange={changeHandler} onBlur={blurHandler} />
                    {errors.documentNumber && <div className="form-user-error-message">{errors?.documentNumber}</div>}
                  </div>
                </div>

              </div>

              <div className='personalData-form-column'>
                <div>
                  <div className="input-content">
                    <label> Fecha de Nacimiento * </label>
                    <input type="date" name="birthDate" value={data.birthDate} onChange={changeHandler} onBlur={blurHandler} />
                    {errors.birthDate && <div className="form-user-error-message">{errors?.birthDate}</div>}
                  </div>
                </div>
                <div>
                  <div className="input-content">
                    <label>Sexo * </label>
                    <select name='sex' value={data.sex} onChange={changeHandler} onBlur={blurHandler}>
                      <option value=''> Sexo </option>
                      <option value='F'>F</option>
                      <option value='M'>M</option>
                      <option value='X'>X</option>
                    </select>
                  </div>
                  {errors.sex && <div className="form-user-error-message">{errors?.sex}</div>}
                </div>
                <div>
                  <div className="input-content">
                    <label> Estado Civil * </label>
                    <select name='civilStatus' value={data.civilStatus} onChange={changeHandler} onBlur={blurHandler}>
                      <option value='' >Estado Civil </option>
                      <option value='Soltero'>Soltero</option>
                      <option value='Casado'>Casado</option>
                      <option value='Divorciado'>Divorciado</option>
                      <option value='Viudo'>Viudo</option>
                    </select>
                  </div>
                  {errors.civilStatus && <div className="form-user-error-message">{errors?.civilStatus}</div>}
                </div>

                <div>
                  <div className="input-content">
                    <label> Telefono *</label>
                    <input type="text" name="telephoneNumber" placeholder="341000000000" value={data.telephoneNumber} onChange={changeHandler} onBlur={blurHandler} />
                  </div>
                  {errors.telephoneNumber && <div className="form-user-error-message">{errors?.telephoneNumber}</div>}
                </div>

                <div className='personalData-adress-container'>
                  <p className='personalData-adress-title'>Datos de domicilio:</p>

                  <label> Calle </label>
                  <input type="text" name="address" placeholder="Callao" value={data.address} onChange={changeHandler} onBlur={blurHandler} />
                  {errors.address && <div className="form-user-error-message">{errors?.address}</div>}

                  <label> Numero de calle </label>
                  <input type="text" name="addressNumber" placeholder="1110" value={data.addressNumber} onChange={changeHandler} onBlur={blurHandler} />
                  {errors.addressNumber && <div className="form-user-error-message">{errors?.addressNumber}</div>}

                  <label>Piso </label>
                  <input type="text" name='floor' placeholder="2" value={data.floor} onChange={changeHandler} onBlur={blurHandler} />
                  {errors.floor && <div className="form-user-error-message">{errors?.floor}</div>}

                  <label> País </label>
                  <input type='text' name='country' placeholder='Argentina' value={data.country} onChange={changeHandler} onBlur={blurHandler} />
                  {errors.country && <div className="form-user-error-message">{errors?.country}</div>}

                  <label> Provincia </label>

                  <select name='province' value={data.province} onChange={changeHandler} onBlur={blurHandler}>
                    {provinces && provinces.info.length !== 0 && provinces.info.provincias.map((p) =>
                      <option key={p.id} value={p.nombre}>{p.nombre}</option>
                    )
                    }
                  </select>
                  {errors.province && <div className="form-user-error-message">{errors?.province}</div>}

                  <label> Localidad </label>
                  <input type='text' name='city' placeholder='Rosario' value={data.city} onChange={changeHandler} onBlur={blurHandler} />
                  {errors.city && <div className="form-user-error-message">{errors?.city}</div>}
                </div>
              </div>
            </div>
          </>
      }

      <div className='personalData-requerid-message'>
        <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
        {provinces.getError !== null && <p className='requerid-camps-message'>(*) Estos campos son obligatorios. </p>}
      </div>

    </div>
  )
}

export default FormPersonalData
