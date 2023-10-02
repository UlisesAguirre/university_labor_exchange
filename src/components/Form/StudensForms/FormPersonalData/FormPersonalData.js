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

  if (regex[name]) {
    if (!regex[name].test(data[name])) {
      if (name === 'userName') {
        error = "El campo solo acepta valores alfanumericos";
      } else if (name === "name") {
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

const FormPersonalData = ({ form, stepForwardHandler }) => {

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
            <input type='text' name='userName' placeholder="MaríaPerez" value={form.userName} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.userName && <div>{errors?.userName}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Email </label>
            <input type="email" name="email" placeholder="miemail@gmail.com" value={form.email} onChange={changeHandler} onBlur={blurHandler} />

            {errors.email && <div>{errors?.email}</div>}
          </div>
        </div>
        <div>
          <div className="input-content">
            <label> Nombres </label>
            <input type='text' name='name' placeholder="María" value={form.name} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.name && <div>{errors?.name}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Apellido </label>
            <input type='text' name='lastname' placeholder="Perez" value={form.lastname} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.lastname && <div>{errors?.lastname}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Legajo </label>
            <input type='text' name='legajo' placeholder="50600" value={form.legajo} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.legajo && <div>{errors?.legajo}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Cuil </label>
            <input type='text' name='cuil' placeholder="23-39580415-4" value={form.cuil} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.cuil && <div>{errors?.cuil}</div>}
        </div>


        <div>
          <div className="input-content">
            <label>Tipo y Número de documento </label>
            <select name='docType' value={form.docType} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">DNI</option>
            </select>


            <input type='text' name='docNumber' placeholder="39580415" value={form.docNumber} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.docType && <div>{errors?.docType}</div>}
          {errors.docNumber && <div>{errors?.docNumber}</div>}

        </div>

        <div>
          <div className="input-content">
            <label> Fecha de Nacimiento </label>
            <input type="date" name="birthdate" value={form.birthdate} onChange={changeHandler} onBlur={blurHandler} />
            {errors.birthdate && <div>{errors?.birthdate}</div>}
          </div>
        </div>
        <div>
          <div className="input-content">
            <label>Sexo</label>
            <select name='sex' value={form.sex} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">F</option>
            </select>
          </div>
          {errors.sex && <div>{errors?.sex}</div>}
        </div>
        <div>
          <div className="input-content">
            <label> Estado Civil </label>
            <select name='civilStatus' value={form.civilStatus} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">Soltero</option>
            </select>
          </div>
          {errors.civilStatus && <div>{errors?.civilStatus}</div>}
        </div>

        <div>
          <div className="input-content">
            <label> Telefono </label>
            <input type="tel" name="telephone" placeholder="341-688829" value={form.telephone} onChange={changeHandler} onBlur={blurHandler} />
          </div>
          {errors.telephone && <div>{errors?.telephone}</div>}
        </div>
      </div>

      <div>
        <p>Dirección</p>

        <label> Calle </label>
        <input type="text" name="street" placeholder="Callao" value={form.street} onChange={changeHandler} onBlur={blurHandler} />
        {errors.street && <div>{errors?.street}</div>}

        <label> Numero de calle </label>
        <input type="number" name="streetNumber" placeholder="1110" value={form.streetNumber} onChange={changeHandler} onBlur={blurHandler} />
        {errors.streetNumber && <div>{errors?.streetNumber}</div>}

        <label>Piso </label>
        <input type="number" name='floor' placeholder="2" value={form.floor} onChange={changeHandler} onBlur={blurHandler} />
        {errors.floor && <div>{errors?.floor}</div>}

        <label> País </label>
        <select name='country' value={form.country} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Argentina</option>
        </select>
        {errors.country && <div>{errors?.country}</div>}

        <label> Provincia </label>
        <select name='province' value={form.province} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Santa Fe</option>
        </select>
        {errors.province && <div>{errors?.province}</div>}

        <label> Localidad </label>
        <select name='city' value={form.city} onChange={changeHandler} onBlur={blurHandler}>
          <option value="1">Rosario</option>
        </select>
        {errors.city && <div>{errors?.city}</div>}

      </div>
      <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />

    </div >
  )
}

export default FormPersonalData
