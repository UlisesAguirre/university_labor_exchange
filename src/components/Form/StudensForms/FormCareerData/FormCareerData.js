import useForm from "../../../../custom/useForm";
 
// TODO: 
// titulo universitario ver si lo ponemos o no.
// mappear selects 
// agregar loading y response 

// FIXME: validación cantidad max de materias aprobadas 

const inicialForm = {
  career: '',
  approvedSubjects: '',
  studyProgram: '',
  currentCareerYear: '',
  turn: '',
  average: '',
  averageWithFails: '',
  CareerTitle: '',
}

const validateForm = (form, name) => {

  let error = '';

  if (!form[name].trim()) {
    error = "Este campo es obligatorio";
  } else if (((name === 'average') || (name === 'averageWithFails')) && ((form[name] > 10) || (form[name] < 0))) {
    error = "El promedio debe ser superior a 0 y igual o inferior a 10";
  } else if ((name === 'approvedSubjects') && (form[name] > 60 || form[name] < 0)) {
    error = "La cantidad de materias aprobadas debe ser superior a 0 y inferior a 60"
  }

  return error;
}

const FormCareerData = () => {

  const {
    form,
    errors,
    loading,
    response,
    changeHandler,
    blurHandler,
    submitHandler,
  } = useForm ({ inicialForm, validateForm });

  return (
    <div className='formLogin-container'>
      <p className='title-formLogin'>Datos Universitarios</p>
      <form className='formLogin-box'>

        <label>Carrera</label>
        <select name="career" onChange={changeHandler} onBlur={blurHandler} value={form.career}>
          <option value={"Ing. civil"}>Ing. civil</option>
          <option value={"Tecnicatura en programación"}> Tecnicatura en programación </option>
        </select>
        {errors.career && <div>{errors?.career}</div>}

        <label>Cantidad materias aprobadas</label>
        <input type="number" name="approvedSubjects" onChange={changeHandler} onBlur={blurHandler} value={form.approvedSubjects} />
        {errors.approvedSubjects && <div>{errors?.approvedSubjects}</div>}

        <label>Plan especialidad</label>
        <select name='studyProgram' onChange={changeHandler} onBlur={blurHandler} value={form.studyProgram} >
          <option value={"2000"}>2000</option>
          <option value={"2008"}>2008</option>
        </select>
        {errors.studyProgram && <div>{errors?.studyProgram}</div>}

        <label>Año que cursa</label>
        <select name='currentCareerYear' onChange={changeHandler} onBlur={blurHandler} value={form.approvedSubjects}>
          <option value={"1"}>1° año</option>
          <option value={"2"}>2° año</option>
        </select>
        {errors.currentCareerYear && <div>{errors?.currentCareerYear}</div>}

        <label>Turno que cursa</label>
        <select name='turn' onChange={changeHandler} onBlur={blurHandler} value={form.turn}>
          <option value={"0"}>mañana</option>
          <option value={"1"}>tarde</option>
        </select>
        {errors.turn && <div>{errors?.turn}</div>}

        <label>Promedio sin aplazos</label>
        <input name='average' type="number" min="0" max="10" step="0.01" onChange={changeHandler} onBlur={blurHandler} value={form.average} />
        {errors.average && <div>{errors?.average}</div>}

        <label>Promedio con aplazos</label>
        <input name='averageWithFails' type="number" min="0" max="10" step="0.01" onChange={changeHandler} onBlur={blurHandler} value={form.averageWithFails} />
        {errors.averageWithFails && <div>{errors?.averageWithFails}</div>}

        <label>Titulo Universitario</label>
        <input name='CareerTitle' type="text" onChange={changeHandler} onBlur={blurHandler} value={form.CareerTitle} />
        {errors.CareerTitle && <div>{errors?.CareerTitle}</div>}

      </form>
    </div>
  )
}

export default FormCareerData
