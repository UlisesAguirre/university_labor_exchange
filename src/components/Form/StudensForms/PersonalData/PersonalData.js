import useFrom from "../../../../custom/useForm"
import BasicButton from "../../../Shared/BasicButton/BasicButton";

//TODO:  estilos y ver de llamar a la api para los datos de direccion. 

const validateData = (data, name) => {

  let error = '';

  if (!data[name].trim()) {
    if (validInputs[name].require) {
      error = "Este campo es obligatorio";
    }
  } else {
    if (validInputs[name].regex) {
      if (!validInputs[name].regex.test(data[name])) {
        if (name === 'userName') {
          error = "El campo solo debe aceptar caracteres alfanuméricos y tener una longitud máxima de 50 caracteres.";
        }
        if (name === 'name' || name === 'lastname') {
          error = "El campo solo debe aceptar caracteres del alfabeto español y tener una longitud mínima de 3 y máxima de 50 caracteres.";
        }
        if (name === 'street' || name === 'city' || name === 'province' || name === 'country') {
          error = "El campo solo debe aceptar caracteres del alfabeto español y tener una longitud máxima de 50 caracteres.";
        }
        if (name === 'docNumber') {
          error = "El número de documento debe ingresarse sin puntos y tener una longitud de 6 o 7 números";
        }
        if (name === 'cuil') {
          error = 'El cuit debe contener guiones';
        }
        if (name === 'streetNumber') {
          error = "El número de calle solo puede contener números y la palabra bis";
        }
        if (name === 'floor') {
          error = "El piso solo puede contener una letra o número del 1 al 20";
        }
        if (name === 'telephone') {
          error = "El número de telefono puede contener opcionalmente el caracter + al comienzo y debe tener un máximo 10 dígitos";
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
  userName: { regex: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ0-9]{1,50}$/, require: true },
  name: { regex: /^[a-zA-Z]{3,50}$/, require: true },
  lastname: { regex: /^[a-zA-Z]{3,50}$/, require: true },
  email: { regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, require: true },
  legajo: { require: true },
  docType: { require: true },
  docNumber: { regex: /^[1-9]\d{6,7}$/, require: true },
  birthdate: { require: true },
  civilStatus: { require: true },
  cuil: { regex: /^(20|23|24|27)-\d{8}-\d$/, require: true, },
  sex: { require: true },
  street: { regex: /^[a-zA-Z]{1,50}$/, require: false, },
  streetNumber: { regex: /^[1-9]\d*\s*(?:bis)?$/, require: false },
  floor: { regex: /^[A-Z0-9]{1,20}$/, require: false },
  city: {
    // regex: /^[a-zA-Z]{,50}$/,
    require: false
  },
  province: {
    // regex: /^[a-zA-Z]{,50}$/,
    require: false
  },
  country: {// regex: /^[a-zA-Z]{,50}$/, 
    require: false },
  telephone: { regex: /^\+?[1-9]\d{10}$/, require: false },

}


const FormPersonalData = ({ form, stepForwardHandler }) => {

  const inicialData = {
    userName: form.userName,
    name: form.name,
    lastname: form.name,
    email: form.email,
    legajo: form.legajo,
    docType: form.docType,
    docNumber: form.docNumber,
    birthdate: form.birthdate,
    civilStatus: form.civilStatus,
    cuil: form.cuil,
    sex: form.sex,
    street: form.street,
    streetNumber: form.streetNumber,
    floor: form.floor,
    city: form.city,
    province: form.province,
    country: form.country,
    telephone: form.telephone,
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

      <div className="personalData-form">

        <div>
          <div className="input-content">
            <label> Nombre de usuario </label>
            <input type='text' name='userName' placeholder="MaríaPerez" value={data.userName} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.userName && <div>{errors?.userName}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Email </label>
            <input type="email" name="email" placeholder="miemail@gmail.com" value={data.email} onChange={changeHandler} onBlur={blurHandler} />
            {errors.email && <div>{errors?.email}</div>}
          </div>
        </div>
        <div>
          <div className="input-content">
            <label> Nombres </label>
            <input type='text' name='name' placeholder="María" value={data.name} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.name && <div>{errors?.name}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Apellido </label>
            <input type='text' name='lastname' placeholder="Perez" value={data.lastname} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.lastname && <div>{errors?.lastname}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Legajo </label>
            <input type='text' name='legajo' placeholder="50600" value={data.legajo} onChange={changeHandler} onBlur={blurHandler} disabled />
          </div>
          {errors.legajo && <div>{errors?.legajo}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Cuil </label>
            <input type='text' name='cuil' placeholder="23-39580415-4" value={data.cuil} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.cuil && <div>{errors?.cuil}</div>}
        </div>


        <div>
          <div className="input-content">
            <label>Tipo y Número de documento </label>
            <select name='docType' value={data.docType} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">DNI</option>
            </select>


            <input type='text' name='docNumber' placeholder="39580415" value={data.docNumber} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.docType && <div>{errors?.docType}</div>}
          {errors.docNumber && <div>{errors?.docNumber}</div>}

        </div>

        <div>
          <div className="input-content">
            <label> Fecha de Nacimiento </label>
            <input type="date" name="birthdate" value={data.birthdate} onChange={changeHandler} onBlur={blurHandler} />
            {errors.birthdate && <div>{errors?.birthdate}</div>}
          </div>
        </div>
        <div>
          <div className="input-content">
            <label>Sexo</label>
            <select name='sex' value={data.sex} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">F</option>
            </select>
          </div>
          {errors.sex && <div>{errors?.sex}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Estado Civil </label>
            <select name='civilStatus' value={data.civilStatus} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">Soltero</option>
            </select>
          </div>
          {errors.civilStatus && <div>{errors?.civilStatus}</div>}
        </div>

        <div>
          <div className="input-content">
            <label> Telefono </label>
            <input type="tel" name="telephone" placeholder="341-688829" value={data.telephone} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.telephone && <div>{errors?.telephone}</div>}
        </div>
      </div>

      <div>
        <p>Dirección</p>

        <label> Calle </label>
        <input type="text" name="street" placeholder="Callao" value={data.street} onChange={changeHandler} onBlur={blurHandler} />
        {errors.street && <div>{errors?.street}</div>}

        <label> Numero de calle </label>
        <input type="number" name="streetNumber" placeholder="1110" value={data.streetNumber} onChange={changeHandler} onBlur={blurHandler} />
        {errors.streetNumber && <div>{errors?.streetNumber}</div>}

        <label>Piso </label>
        <input type="number" name='floor' placeholder="2" value={data.floor} onChange={changeHandler} onBlur={blurHandler} />
        {errors.floor && <div>{errors?.floor}</div>}

        <label> País </label>
        <select name='country' value={data.country} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Argentina</option>
        </select>
        {errors.country && <div>{errors?.country}</div>}

        <label> Provincia </label>
        <select name='province' value={data.province} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Santa Fe</option>
        </select>
        {errors.province && <div>{errors?.province}</div>}

        <label> Localidad </label>
        <select name='city' value={data.city} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Rosario</option>
        </select>
        {errors.city && <div>{errors?.city}</div>}

      </div>
      <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />

    </div >
  )
}

export default FormPersonalData
