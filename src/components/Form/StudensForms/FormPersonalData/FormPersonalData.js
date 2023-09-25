import useFrom from "../../../../custom/useForm"
import BasicButton from "../../../Shared/BasicButton/BasicButton";

//TODO: agregar validaciones, estilos y ver de llamar a la api para los datos de direccion. 

const inicialData = {
  userName: '',
  name: '',
  lastname: '',
  email: '',
  legajo: '',
  docType: '',
  docNumber: '',
  birthdate: '',
  civilStatus: '',
  cuil: '',
  sex: '',
  street: '',
  streetNumber: '',
  floor: '',
  city: '',
  province: '',
  country: '',
  telephone: '',
}

const validateData = (data, name) => {
  
  let error = '';

  if (!data[name].trim()) {
    error = "Este campo es obligatorio";
  }

  if(regex[name]){
    if(!regex[name].test(data[name])){
     if(name === 'userName'){
      error = "El campo solo acepta valores alfanumericos";
     } else if(name === "name"){
      error = "El campo sólo acpta valores del alfabeto español"
     }
    }
  }

  return error;
}

const regex = {
  userName: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ0-9]{1,50}$/,
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{1,50}$/,
  lastname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{1,50}$/,
  legajo: /^[A-Z0-9]{1,7}$/,
}

const FormPersonalData = ({stepForwardHandler}) => {

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
  } = useFrom({ inicialData, validateData, stepForwardHandler })


  return (
    <div>
      <p>Datos Personales</p>
     
        <div>

          <label> Nombre de usuario </label>
          <input type='text' name='userName' placeholder="MaríaPerez" value={data.userName} onChange={changeHandler} onBlur={blurHandler} />
          {errors.userName && <div>{errors?.userName}</div>}

          <label> Nombres </label>
          <input type='text' name='name' placeholder="María" value={data.name} onChange={changeHandler} onBlur={blurHandler} />
          {errors.name && <div>{errors?.name}</div>}

          <label> Apellido </label>
          <input type='text' name='lastname' placeholder="Perez" value={data.lastname} onChange={changeHandler} onBlur={blurHandler} />
          {errors.lastname && <div>{errors?.lastname}</div>}

          <label> Legajo </label>
          <input type='text' name='legajo' placeholder="50600" value={data.legajo} onChange={changeHandler} onBlur={blurHandler} />
          {errors.legajo && <div>{errors?.legajo}</div>}

          <label> Cuil </label>
          <input type='text' name='cuil' placeholder="23-39580415-4" value={data.cuil} onChange={changeHandler} onBlur={blurHandler} />
          {errors.cuil && <div>{errors?.cuil}</div>}


          <div>

            <label>Tipo y Número de documento </label>
            <select name='docType' value={data.docType} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">DNI</option>
            </select>
            {errors.docType && <div>{errors?.docType}</div>}

            <input type='text' name='docNumber' placeholder="39580415" value={data.docNumber} onChange={changeHandler} onBlur={blurHandler} />
            {errors.docNumber && <div>{errors?.docNumber}</div>}

          </div>

          <label> Fecha de Nacimiento </label>
          <input type="date" name="birthdate" value={data.birthdate} onChange={changeHandler} onBlur={blurHandler} />
          {errors.birthdate && <div>{errors?.birthdate}</div>}

          <label>Sexo</label>
          <select name='sex' value={data.sex} onChange={changeHandler} onBlur={blurHandler}>
            <option value="1">F</option>
          </select>
          {errors.sex && <div>{errors?.sex}</div>}

          <label> Estado Civil </label>
          <select name='civilStatus' value={data.civilStatus} onChange={changeHandler} onBlur={blurHandler}>
            <option value="1">Soltero</option>
          </select>
          {errors.civilStatus && <div>{errors?.civilStatus}</div>}

          <label> Email </label>
          <input type="email" name="email" placeholder="miemail@gmail.com" value={data.email} onChange={changeHandler} onBlur={blurHandler} />
          {errors.email && <div>{errors?.email}</div>}

          <label> Telefono </label>
          <input type="tel" name="telephone" placeholder="341-688829" value={data.telephone} onChange={changeHandler} onBlur={blurHandler} />
          {errors.telephone && <div>{errors?.telephone}</div>}
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

    </div>
  )
}

export default FormPersonalData
