import { useContext } from "react";
import useFrom from "../../../../custom/useForm";
import useGetRequest from "../../../../custom/useGetRequest";
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import Spinner from "../../../Shared/Spinner/Spinner";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import "./careerData.css"

// TODO: 
// Agregar estilos


const validateData = (data, name) => {
  let error = '';

  if ((data[name] !== null && data[name] !== '') && regex[name]) {
    if (!regex[name].test(data[name])) {
      if ((name === 'average') || (name === 'averageWithFails')) {
        error = "El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00";
      }
      if (name === 'approvedSubjects') {
        error = "La cantidad de materias aprobadas debe ser superior a 0 y inferior a 60"
      }
      if (name === 'studyProgram') {
        error = 'El Plan solo acepta años entre 1900 y 2200'
      }
    }
  }

  return error;
}

const regex = {
  approvedSubjects: /^(?:[1-9]|[1-5][0-9]|60)$/,
  average: /^(?:[0-9]|10)(?:\.\d{1,2})?$/,
  averageWithFails: /^(?:[0-9]|10)(?:\.\d{1,2})?$/,
  studyProgram: /^(199[0-9]|20[0-2][0-9]|2300)$/,
}

const FormCareerData = ({ form, stepForwardHandler, stepBackHandler }) => {

  const { theme } = useContext(ThemeContext);

  const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Career/GetCareersForForms');

  const careers = getData;


  const inicialData = {
    idCareer: form.idCareer ? form.idCareer : null,
    approvedSubjects: form.approvedSubjects,
    studyProgram: form.studyProgram,
    currentCareerYear: form.currentCareerYear,
    turn: form.turn,
    average: form.average,
    averageWithFails: form.averageWithFails,
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
    <div className="careerData-container">
      {(loading) && <Spinner />}
      {error && <span>error.message</span>}
      <h2> Datos Universitarios </h2>

      <div className={`careerData-form ${theme}`}>

        <label>Carrera</label>
        <select name="idCareer" onChange={changeHandler} onBlur={blurHandler} value={data.idCareer}>
          <option value=''>Carrera</option>
          {careers.map((c) =>
            <option key={c.idCareer} value={c.idCareer}>{c.name}</option>
          )}
        </select>
        {errors.idCareer && <div className="form-user-error-message">{errors?.idCareer}</div>}

        <label>Cantidad materias aprobadas</label>
        <input type="number" name="approvedSubjects" placeholder="5" onChange={changeHandler} onBlur={blurHandler} value={data.approvedSubjects} />
        {errors.approvedSubjects && <div className="form-user-error-message">{errors?.approvedSubjects}</div>}

        <label>Plan especialidad</label>
        <input type='number' min="1990" max="2300" name='studyProgram' placeholder="2008" onChange={changeHandler} onBlur={blurHandler} value={data.studyProgram} />
        {errors.studyProgram && <div className="form-user-error-message">{errors?.studyProgram}</div>}

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
        {errors.currentCareerYear && <div className="form-user-error-message">{errors?.currentCareerYear}</div>}

        <label>Turno que cursa</label>
        <select name='turn' onChange={changeHandler} onBlur={blurHandler} value={data.turn}>
          <option value=''>Turno que cursa</option>
          <option value='Mañana'>Mañana</option>
          <option value='Tarde'>Tarde</option>
          <option value='Noche'>Noche</option>
        </select>
        {errors.turn && <div className="form-user-error-message">{errors?.turn}</div>}

        <label>Promedio sin aplazos</label>
        <input name='average' type="number" min="0" max="10" step="0.01" placeholder="0.00" onChange={changeHandler} onBlur={blurHandler} value={data.average} />
        {errors.average && <div className="form-user-error-message">{errors?.average}</div>}

        <label>Promedio con aplazos</label>
        <input name='averageWithFails' type="number" min="0" max="10" step="0.01" placeholder="0.00" onChange={changeHandler} onBlur={blurHandler} value={data.averageWithFails} />
        {errors.averageWithFails && <div className="form-user-error-message">{errors?.averageWithFails}</div>}

      </div>


      <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
      <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />

    </div>
  )
}

export default FormCareerData
