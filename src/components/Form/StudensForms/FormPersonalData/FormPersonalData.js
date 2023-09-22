import useFrom from "../../../../custom/useForm"

//TODO: agregar validaciones, estilos y ver de llamar a la api para los datos de direccion. 

const inicialValues = {
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

const validateForm = (form, name) => {
  let error = '';

  if (!form[name].trim()) {
    error = "Este campo es obligatorio";
  }

  return error;
}


const FormPersonalData = () => {

  const {
    form,
    errors,
    loading,
    response,
    changeHandler,
    blurHandler,
    submitHandler,
  } = useFrom(inicialValues, validateForm)


  return (
    <div>
      <p>Datos Personales</p>
      <form>
        <div>

          <label> Nombre de usuario </label>
          <input type='text' name='userName' placeholder="MaríaPerez" value={form.userName} onChange={changeHandler} onBlur={blurHandler} />
          {errors.userName && <div>{errors?.userName}</div>}

          <label> Nombres </label>
          <input type='text' name='name' placeholder="María" value={form.name} onChange={changeHandler} onBlur={blurHandler} />
          {errors.name && <div>{errors?.name}</div>}

          <label> Apellido </label>
          <input type='text' name='lastname' placeholder="Perez" value={form.lastname} onChange={changeHandler} onBlur={blurHandler} />
          {errors.lastname && <div>{errors?.lastname}</div>}

          <label> Legajo </label>
          <input type='text' name='legajo' placeholder="50600" value={form.legajo} onChange={changeHandler} onBlur={blurHandler} />
          {errors.legajo && <div>{errors?.legajo}</div>}


          <div>

            <label>Tipo y Número de documento </label>
            <select name='docType' value={form.docType} onChange={changeHandler} onBlur={blurHandler}>
              <option value="1">DNI</option>
            </select>
            {errors.docType && <div>{errors?.docType}</div>}

            <input type='text' name='docNumber' placeholder="39580415" value={form.docNumber} onChange={changeHandler} onBlur={blurHandler} />
            {errors.docNumber && <div>{errors?.docNumber}</div>}

          </div>

          <label> Fecha de Nacimiento </label>
          <input type="date" name="birthdate" value={form.birthdate} onChange={changeHandler} onBlur={blurHandler} />
          {errors.birthdate && <div>{errors?.birthdate}</div>}

          <label>Sexo</label>
          <select name='sex' value={form.sex} onChange={changeHandler} onBlur={blurHandler}>
            <option value="1">F</option>
          </select>
          {errors.sex && <div>{errors?.sex}</div>}

          <label> Estado Civil </label>
          <select name='civilStatus' value={form.civilStatus} onChange={changeHandler} onBlur={blurHandler}>
            <option value="1">Soltero</option>
          </select>
          {errors.civilStatus && <div>{errors?.civilStatus}</div>}

          <label> Email </label>
          <input type="email" name="email" placeholder="miemail@gmail.com" value={form.email} onChange={changeHandler} onBlur={blurHandler} />
          {errors.email && <div>{errors?.email}</div>}

          <label> Telefono </label>
          <input type="tel" name="telephone" placeholder="341-688829" value={form.telephone} onChange={changeHandler} onBlur={blurHandler} />
          {errors.telephone && <div>{errors?.telephone}</div>}
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
      </form>
    </div>
  )
}

export default FormPersonalData
