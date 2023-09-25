import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";

// TODO: 
// Agregar estilos
// titulo universitario ver si lo ponemos o no.
// mappear selects 
// agregar loading y response 

// FIXME: validación cantidad max de materias aprobadas 

const inicialData = {
  career: '',
  approvedSubjects: '',
  studyProgram: '',
  currentCareerYear: '',
  turn: '',
  average: '',
  averageWithFails: '',
  CareerTitle: '',
}

const validateData = (data, name) => {

  let error = '';

  if (!data[name].trim()) {
    error = "Este campo es obligatorio";
  } else if (((name === 'average') || (name === 'averageWithFails')) && ((data[name] > 10) || (data[name] < 0))) {
    error = "El promedio debe ser superior a 0 y igual o inferior a 10";
  } else if ((name === 'approvedSubjects') && (data[name] > 60 || data[name] < 0)) {
    error = "La cantidad de materias aprobadas debe ser superior a 0 y inferior a 60"
  }

  return error;
}

const FormCareerData = ({ stepForwardHandler, stepBackHandler }) => {

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
    moveBackHandler
  } = useFrom({ inicialData, validateData, stepForwardHandler, stepBackHandler })

  return (
    <div >
      
      <p> Datos Universitarios </p>
     
      <div>
       
        <label>Carrera</label>
        <select name="career" onChange={changeHandler} onBlur={blurHandler} value={data.career}>
          <option value={"Ing. civil"}>Ing. civil</option>
          <option value={"Tecnicatura en programación"}> Tecnicatura en programación </option>
        </select>
        {errors.career && <div>{errors?.career}</div>}

        <label>Cantidad materias aprobadas</label>
        <input type="number" name="approvedSubjects" placeholder="5" onChange={changeHandler} onBlur={blurHandler} value={data.approvedSubjects} />
        {errors.approvedSubjects && <div>{errors?.approvedSubjects}</div>}

        <label>Plan especialidad</label>
        <select name='studyProgram' onChange={changeHandler} onBlur={blurHandler} value={data.studyProgram} >
          <option value={"2000"}>2000</option>
          <option value={"2008"}>2008</option>
        </select>
        {errors.studyProgram && <div>{errors?.studyProgram}</div>}

        <label>Año que cursa</label>
        <select name='currentCareerYear' onChange={changeHandler} onBlur={blurHandler} value={data.approvedSubjects}>
          <option value={"1"}>1° año</option>
          <option value={"2"}>2° año</option>
        </select>
        {errors.currentCareerYear && <div>{errors?.currentCareerYear}</div>}

        <label>Turno que cursa</label>
        <select name='turn' onChange={changeHandler} onBlur={blurHandler} value={data.turn}>
          <option value={"0"}>mañana</option>
          <option value={"1"}>tarde</option>
        </select>
        {errors.turn && <div>{errors?.turn}</div>}

        <label>Promedio sin aplazos</label>
        <input name='average' type="number" min="0" max="10" step="0.01" placeholder="0.00" onChange={changeHandler} onBlur={blurHandler} value={data.average} />
        {errors.average && <div>{errors?.average}</div>}

        <label>Promedio con aplazos</label>
        <input name='averageWithFails' type="number" min="0" max="10" step="0.01" placeholder="0.00" onChange={changeHandler} onBlur={blurHandler} value={data.averageWithFails} />
        {errors.averageWithFails && <div>{errors?.averageWithFails}</div>}

        <label>Titulo Universitario</label>
        <input name='CareerTitle' type="text" placeholder="Ingeniero Electrico" onChange={changeHandler} onBlur={blurHandler} value={data.CareerTitle} />
        {errors.CareerTitle && <div>{errors?.CareerTitle}</div>}
      
      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
        <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
      </div>

    </div>
  )
}

export default FormCareerData
