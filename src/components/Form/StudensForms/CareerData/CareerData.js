import { useEffect, useState } from "react";
import useFrom from "../../../../custom/useForm";
import useGetRequest from "../../../../custom/useGetRequest";
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import Spinner from "../../../Shared/Spinner/Spinner";

// TODO: 
// Agregar estilos
// titulo universitario ver si lo ponemos o no.

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
      // if (name === 'careerTitle') {
      //   error = 'El título de la carrera solo acepta caracteres del alfabeto español y un máximo de 50 caracteres';
      // }
      if (name === 'studyProgram') {
        error = 'El Plan solo acepta años entre 1900 y 2200'
      }
    }
  }

  return error;
}

const regex = {
  approvedSubjects: /^([1-9]|[1-5][0-9]|60)$/,
  average: /^(?:[1-9]|10)(?:\.00)?$/,
  averageWithFails: /^(?:[1-9]|10)(?:\.00)?$/,
  // careerTitle: /^[a-zA-Z]{3,50}$/,
  studyProgram: /^(19[9-9][0-9]|20[0-9][0-9]|21[0-9][0-9]|2200)$/,
}

const FormCareerData = ({ form, stepForwardHandler, stepBackHandler }) => {

  const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Career/GetAllCareers');

  const careers = getData;

  const inicialData = {
    idCarrer: form.idCarrer,
    approvedSubjects: form.approvedSubjects,
    studyProgram: form.studyProgram ,
    currentCareerYear: form.currentCareerYear,
    turn: form.turn,
    average: form.average,
    averageWithFails: form.averageWithFails,
    // careerTitle: form.careerTitle,
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
        <select name="idCarrer" onChange={changeHandler} onBlur={blurHandler} value={data.idCarrer}>
          <option value={''}>Careera</option>
          {careers.map((c) =>
            <option key={c.idCarrer} value={c.idCarrer}>{c.name}</option>
          )}
        </select>
        {errors.idCarrer && <div>{errors?.idCarrer}</div>}

        <label>Cantidad materias aprobadas</label>
        <input type="number" name="approvedSubjects" placeholder="5" onChange={changeHandler} onBlur={blurHandler} value={data.approvedSubjects} />
        {errors.approvedSubjects && <div>{errors?.approvedSubjects}</div>}

        <label>Plan especialidad</label>
        <input name='studyProgram' placeholder="2008" onChange={changeHandler} onBlur={blurHandler} value={data.studyProgram} />
        {errors.studyProgram && <div>{errors?.studyProgram}</div>}

        <label>Año que cursa</label>
        <select name='currentCareerYear' onChange={changeHandler} onBlur={blurHandler} value={data.currentCareerYear}>
          <option value={''}>Año que cursa</option>
          <option value={"1"}>1° año</option>
          <option value={"2"}>2° año</option>
          <option value={"3"}>3° año</option>
          <option value={"4"}>4° año</option>
          <option value={"5"}>5° año</option>
          <option value={"6"}>6° año</option>
        </select>
        {errors.currentCareerYear && <div>{errors?.currentCareerYear}</div>}

        <label>Turno que cursa</label>
        <select name='turn' onChange={changeHandler} onBlur={blurHandler} value={data.turn}>
          <option value=''>Turno que cursa</option>
          <option value='Mañana'>Mañana</option>
          <option value='Tarde'>Tarde</option>
          <option value='Noche'>Noche</option>
        </select>
        {errors.turn && <div>{errors?.turn}</div>}

        <label>Promedio sin aplazos</label>
        <input name='average' type="number" min="0" max="10" step="0.01" placeholder="0.00" onChange={changeHandler} onBlur={blurHandler} value={data.average} />
        {errors.average && <div>{errors?.average}</div>}

        <label>Promedio con aplazos</label>
        <input name='averageWithFails' type="number" min="0" max="10" step="0.01" placeholder="0.00" onChange={changeHandler} onBlur={blurHandler} value={data.averageWithFails} />
        {errors.averageWithFails && <div>{errors?.averageWithFails}</div>}

        {/* <label>Titulo Universitario</label>
        <input name='careerTitle' type="text" placeholder="Ingeniero Electrico" onChange={changeHandler} onBlur={blurHandler} value={data.careerTitle} />
        {errors.careerTitle && <div>{errors?.careerTitle}</div>} */}

      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
        <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
      </div>

    </div>
  )
}

export default FormCareerData
