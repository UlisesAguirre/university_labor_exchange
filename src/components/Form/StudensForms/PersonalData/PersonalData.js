import { format } from 'date-fns';

import useFrom from "../../../../custom/useForm"
import BasicButton from "../../../Shared/BasicButton/BasicButton";

//TODO:  estilos y ver de llamar a la api para los datos de direccion. 

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
          error = "El campo solo debe aceptar caracteres del alfabeto español y tener una longitud máxima de 50 caracteres.";
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
          error = "El valor de la calle debe estar dentro del rango de 0 a 10,000 y puede incluir opcionalmente la palabra 'bis'";
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
  }

  return error;
}

const validInputs = {
  username: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true }, //FIXME: 
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
  addressNumber: { regex: /^(?:[1-9]\d{0,3}|10000)(?: bis)?$/, require: false },
  floor: { regex: /^(0|1?\d|20)$/, require: false },
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
  telephoneNumber: { regex: /^\+?[1-9]\d{9,10}$/, require: false },

}


const FormPersonalData = ({ form, stepForwardHandler }) => {

  const inicialData = {
    username: form.username,
    name: form.name,
    lastName: form.lastName,
    email: form.email,
    legajo: form.legajo,
    documentType: form.documentType,
    documentNumber: form.documentNumber,
    birthDate: format(new Date(form.birthDate), 'yyyy-MM-dd'),
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
    <div className="form-container">
      <p>Datos Personales</p>

      <p>Los campos marcados con (*) son obligatorios </p>

      <div className="personalData-form">

        <div>
          <div className="input-content">
            <label> Nombre de usuario * </label>
            <input type='text' name='username' placeholder="MaríaPerez" value={data.username} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.username && <div>{errors?.username}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Email * </label>
            <input type="email" name="email" placeholder="example@gmail.com" value={data.email} onChange={changeHandler} onBlur={blurHandler} />
            {errors.email && <div>{errors?.email}</div>}
          </div>
        </div>
        <div>
          <div className="input-content">
            <label> Nombres * </label>
            <input type='text' name='name' placeholder="María" value={data.name} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.name && <div>{errors?.name}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Apellido * </label>
            <input type='text' name='lastName' placeholder="Perez" value={data.lastName} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.lastName && <div>{errors?.lastName}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Legajo </label>

            <input type='text' name='legajo' defaultValue={data.legajo} onChange={changeHandler} onBlur={blurHandler} readOnly />
            <span> El legajo no puede modificarse </span>
          </div>
          {/* {errors.legajo && <div>{errors?.legajo}</div>} */}
        </div>
        <div>
          <div className="input-content">
            <label> Cuil * </label>
            <input type='text' name='cuil' placeholder="23-39580415-4" value={data.cuil} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.cuil && <div>{errors?.cuil}</div>}
        </div>


        <div>
          <div className="input-content">
            <label>Tipo de documento * </label>
            <select name='documentType' value={data.documentType} onChange={changeHandler} onBlur={blurHandler}>
              <option value=''>Tipo de documento</option>
              <option value='DocumentoUnico'>DNI</option>
              <option value='LibretaCivica'>Libreta Civica</option>
              <option value='LibretadeEnrolamiento'>Libreta de Enrolamiento</option>
              <option value='Pasaporte'>Pasaporte</option>
            </select>
            {errors.documentType && <div>{errors?.documentType}</div>}

            <label>Número de documento * </label>
            <input type='text' name='documentNumber' placeholder="39580415" value={data.documentNumber} onChange={changeHandler} onBlur={blurHandler} />
            {errors.documentNumber && <div>{errors?.documentNumber}</div>}
          </div>



        </div>

        <div>
          <div className="input-content">
            <label> Fecha de Nacimiento * </label>
            <input type="date" name="birthDate" value={data.birthDate} onChange={changeHandler} onBlur={blurHandler} />
            {errors.birthDate && <div>{errors?.birthDate}</div>}
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
          {errors.sex && <div>{errors?.sex}</div>}
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
          {errors.civilStatus && <div>{errors?.civilStatus}</div>}
        </div>

        <div>
          <div className="input-content">
            <label> Telefono </label>
            <input type="text" name="telephoneNumber" placeholder="341000000000" value={data.telephoneNumber} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.telephoneNumber && <div>{errors?.telephoneNumber}</div>}
        </div>
      </div>

      <div>
        <p>Dirección</p>

        <label> Calle </label>
        <input type="text" name="address" placeholder="Callao" value={data.address} onChange={changeHandler} onBlur={blurHandler} />
        {errors.address && <div>{errors?.address}</div>}

        <label> Numero de calle </label>
        <input type="text" name="addressNumber" placeholder="1110" value={data.addressNumber} onChange={changeHandler} onBlur={blurHandler} />
        {errors.addressNumber && <div>{errors?.addressNumber}</div>}

        <label>Piso </label>
        <input type="text" name='floor' placeholder="2" value={data.floor} onChange={changeHandler} onBlur={blurHandler} />
        {errors.floor && <div>{errors?.floor}</div>}

        <label> País </label>
        <input type='text' name='country' placeholder='Argentina' value={data.country} onChange={changeHandler} onBlur={blurHandler} />
        {/* <select name='country' value={data.country} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Argentina</option>
        </select> */}
        {errors.country && <div>{errors?.country}</div>}

        <label> Provincia </label>
        <input type='text' name='province' placeholder='Santa Fe' value={data.province} onChange={changeHandler} onBlur={blurHandler} />
        {/* <select name='province' value={data.province} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Santa Fe</option>
        </select> */}
        {errors.province && <div>{errors?.province}</div>}

        <label> Localidad </label>
        <input type='text' name='city' placeholder='Rosario' value={data.city} onChange={changeHandler} onBlur={blurHandler} />
        {/* <select name='city' value={data.city} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Rosario</option>
        </select> */}
        {errors.city && <div>{errors?.city}</div>}

      </div>
      <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />

    </div >
  )
}

export default FormPersonalData
