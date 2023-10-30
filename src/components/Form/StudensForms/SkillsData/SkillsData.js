import { useContext, useState } from "react";
import useFrom from "../../../../custom/useForm";
import useGetRequest from "../../../../custom/useGetRequest";
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../Shared/Spinner/Spinner";
import Error from '../../../Shared/Error/Error'

import "./skillsData.css"
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";

const validateData = (data, name) => {
  let error = '';
  return error;
}

const FormSkillsData = ({ form, stepBackHandler, stepForwardHandler }) => {

  const { theme } = useContext(ThemeContext);

  const { getData, loading, error } = useGetRequest('https://university-labor-exchange.azurewebsites.net/api/Skill/GetSkillsForForm');
  const [studentsSkills, setStudentsSkills] = useState(form.studentsSkills);
  const [messageError, setMessageError] = useState('');

  const skills = getData ? getData : [];

  const inicialData = {
    idSkill: '',
    skillLevel: '',
    legajo: form.legajo,
  }

  const addSkill = (e) => {
    e.preventDefault();
    if (data.idSkill && data.skillLevel) {
      data.idSkill = parseInt(data.idSkill);
      if (studentsSkills.filter((s) => s.idSkill === data.idSkill).length !== 0) {
        setMessageError('La habilidad seleccionada ya existe en su lista! Debe eliminarla y volver a cargarla si desea actualizarla')
      } else {
        setStudentsSkills([...studentsSkills, data]);
        setMessageError('')
      }
    } else {
      setMessageError("Debe completar ambos campos antes de agregar la habilidad");
    }
  }

  function getSkillNameById(idSkill) {
    const skill = skills.find((item) => item.idSkill === idSkill);
    return skill ? skill.skillName : null;
  }

  const deleteSkill = (idSkill, e) => {
    e.preventDefault()
    setStudentsSkills(studentsSkills.filter(s =>
      s.idSkill !== idSkill
    ));
  }

  const moveForwardHandler = (e) => {
    e.preventDefault();
    stepForwardHandler(studentsSkills);
  }

  const moveBackHandler = (e) => {
    e.preventDefault()
    stepBackHandler(studentsSkills)
  }

  const {
    data,
    changeHandler,
    blurHandler,
  } = useFrom({ inicialData, validateData })

  return (
    <div className="skillsData-container">
      {error ?
        <Error error={error} />
        :
        <>
          {(loading) && <Spinner />}

          <h2>Habilidades</h2>

          <div className={`skillsData-form ${theme}`}>

            <div className="skillsData-form-column">
              <label>Habilidades disponibles</label>
              <select name="idSkill" onChange={changeHandler} onBlur={blurHandler} value={data.idSkill}>
                <option value={''} >Skills</option>
                {skills.map((s) => <option key={s.idSkill} value={s.idSkill}>{s.skillName}</option>)}
              </select>


              <label>Nivel de habilidad</label>
              <select name="skillLevel" onChange={changeHandler} onBlur={blurHandler} value={data.skillLevel}>
                <option value='' >Nivel</option>
                <option value={"Bajo"}>Bajo</option>
                <option value={"Intermedio"}>Intermedio</option>
                <option value={"Alto"}>Alto</option>
              </select>

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
        </>
      }

      <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
      {error === null && <BasicButton buttonName={'Guardar'} buttonHandler={moveForwardHandler} />}
      
    </div>


  )
}

export default FormSkillsData
