import { useContext, useState } from "react";
import useFrom from "../../../../custom/useForm";
import useGetRequest from "../../../../custom/useGetRequest";
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../Shared/Spinner/Spinner";

import "./skillsData.css"
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";

const validateData = (data, name) => {
  let error = '';
  return error;
}

const FormSkillsData = ({ form, stepBackHandler, stepForwardHandler }) => {

  const { theme } = useContext(ThemeContext);

  const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Skill/GetAllSkills');
  const [studentsSkills, setStudentsSkills] = useState(form.studentsSkills);
  const [messageError, setMessageError] = useState('');

  const skills = getData;

  const inicialData = {
    idSkill: '',
    skillLevel: '',
    legajo: form.legajo,
  }

  const addSkill = (e) => {
    e.preventDefault();
    if (data.idSkill !== '' && data.skillLevel !== '') {
      data.idSkill = parseInt(data.idSkill);
      if (studentsSkills.filter((s) => s.idSkill === data.idSkill).length !== 0) {
        setMessageError('La habilidad seleccionada ya existe en su lista! Debe eliminarla y volver a cargarla si desea actualizarla')
      } else {
        setStudentsSkills([...studentsSkills, data]);
        setMessageError('')
      }

    }
  }

  function getSkillNameById(idSkill) {
    const skill = skills.find((item) => item.idSkill === idSkill);
    return skill ? skill.skillName : null;
  }

  const deleteSkill = (idSkill, e) => {
    e.preventDefault()
    // var updatedSkills = studentsSkills.splice(index, 1);
    setStudentsSkills(studentsSkills.filter(s =>
      s.idSkill !== idSkill
    ));
  }

  const moveForwardHandler = (e) => {
    e.preventDefault();
    stepForwardHandler(studentsSkills);
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveBackHandler,
  } = useFrom({ inicialData, validateData, stepBackHandler })

  return (
    <div className="skillsData-container">
      {(loading) && <Spinner />}
      <h2>Habilidades</h2>
      <div className={`skillsData-form ${theme}`}>


        <div className="skillsData-form-column">
          <label>Habilidades disponibles</label>
          <select name="idSkill" onChange={changeHandler} onBlur={blurHandler} value={data.idSkill}>
            <option value={''} >Skills</option>
            {skills.map((s) => <option key={s.idSkill} value={s.idSkill}>{s.skillName}</option>)}
          </select>
          {errors.idSkill && <div className="form-user-error-message">{errors?.idSkill}</div>}

          <label>Nivel de habilidad</label>
          <select name="skillLevel" onChange={changeHandler} onBlur={blurHandler} value={data.skillLevel}>
            <option value='' >Nivel</option>
            <option value={"bajo"}>Bajo</option>
            <option value={"intermedio"}>Intermedio</option>
            <option value={"alto"}>Alto</option>
          </select>
          {errors.skillLevel && <div className="form-user-error-message">{errors?.skillLevel}</div>}

          <BasicButton buttonName={'Agregar Habilidad'} buttonHandler={addSkill} />
          {messageError && <div className="form-user-error-message">{messageError}</div>}
        </div>

        <div className="skillsData-form-column">
          <table>
            <caption>Mis Habilidades</caption>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              {studentsSkills.map((ns, index) => (
                <tr key={index}>
                  <td>{getSkillNameById(ns.idSkill)}</td>
                  <td>{ns.skillLevel}</td>
                  <td><button className="button" onClick={(e) => deleteSkill(ns.idSkill, e)}>
                    <FontAwesomeIcon icon={faTrash} /> Borrar
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table >
        </div>


      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
        <BasicButton buttonName={'Guardar'} buttonHandler={moveForwardHandler} />
      </div>

    </div>
  )
}

export default FormSkillsData
