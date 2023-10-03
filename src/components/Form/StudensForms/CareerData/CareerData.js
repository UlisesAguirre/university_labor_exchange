import { useEffect, useState } from "react";
import useFrom from "../../../../custom/useForm";
import useGetRequest from "../../../../custom/useGetRequest";
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import Spinner from "../../../Shared/Spinner/Spinner";

// TODO: 
// Agregar estilos
// titulo universitario ver si lo ponemos o no.
// mappear selects 
// agregar loading y response 

// FIXME: validación cantidad max de materias aprobadas 


const validateData = (data, name) => {

  let error = '';

  if (regex[name]) {
    if (regex[name].test(data[name])) {
      if ((name === 'average') || (name === 'averageWithFails')) {
        error = "El promedio debe ser superior a 0 e igual o inferior a 10 ";
      }
      if (name === 'approvedSubjects') {
        error = "La cantidad de materias aprobadas debe ser superior a 0 y inferior a 60"
      }
      if (name === 'careerTitle') {
        error = 'El título de la carrera solo acepta caracteres del alfabeto español y un máximo de 50 caracteres';
      }
    }
  }

  return error;
}

const regex = {
  approvedSubjects: /^([1-9]|[1-5][0-9]|60)$/,
  average: /^(?:[1-9]|10)(?:\.00)?$/,
  averageWithFails: /^(?:[1-9]|10)(?:\.00)?$/,
  careerTitle: /^[a-zA-Z]{3,50}$/,
}

const FormCareerData = ({ form, stepForwardHandler, stepBackHandler }) => {

  const { getData, loading, error }= useGetRequest('https://localhost:7049/api/Career/GetAllCareers');

  const [list, setlist] = useState([]);

  useEffect(() => {
    if(getData){
      setlist(getData);
      console.log(getData)
    }
  },[getData])

  const inicialData = {
    career: form.career,
    approvedSubjects: form.approvedSubjects,
    studyProgram: form.studyProgram,
    currentCareerYear: form.currentCareerYear,
    turn: form.turn,
    average: form.average,
    averageWithFails: form.averageWithFails,
    careerTitle: form.careerTitle,
  }

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
      {(loading) && <Spinner />}
      {error && <span>error.message</span>}

      <p> Datos Universitarios </p>

      <div>

        <label>Carrera</label>
        <select name="career" onChange={changeHandler} onBlur={blurHandler} value={data.career}>
          {list.map((c) =>
            <option key={c.idCarrer} value={c.idCarrer}>{c.name}</option>
          )}
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
