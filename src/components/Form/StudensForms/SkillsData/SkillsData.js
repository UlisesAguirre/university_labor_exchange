import {useState } from "react";
import useFrom from "../../../../custom/useForm";
import useGetRequest from "../../../../custom/useGetRequest";
import BasicButton from "../../../Shared/BasicButton/BasicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../Shared/Spinner/Spinner";


const validateData = (data, name) => {

  let error = '';

  return error;
}


const FormSkillsData = ({ form, stepBackHandler, stepForwardHandler }) => {

  const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Skill/GetAllSkills');
  const [newSkills, setNewSkills] = useState(form.studentsSkills);

  const skills = getData;

  const inicialData = {
    idSkill: '',
    skillLevel: '',
  }

  const addSkill = (e) => {
    e.preventDefault();
    if (data.idSkill !== '' && data.skillLevel !== '') {
      data.idSkill = parseInt(data.idSkill);
      setNewSkills([...newSkills, data]);
    }
  }

  function obtenerSkillNamePorId(idSkill) {
    const skill = skills.find((item) => item.idSkill === idSkill);
    return skill ? skill.skillName : null;
  }

  const moveForwardHandler = (e) => {
    e.preventDefault();
    stepForwardHandler(newSkills);
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveBackHandler,
  } = useFrom({ inicialData, validateData, stepBackHandler })

  return (
    <div>
      {(loading) && <Spinner />}
      <p>Skills form</p>
      <div>

        <label>Habilidades</label>
        <select name="idSkill" onChange={changeHandler} onBlur={blurHandler} value={data.idSkill}>
          <option value={''} >Skills</option>
          {skills.map((s) => <option key={s.idSkill} value={s.idSkill}>{s.skillName}</option>)}
        </select>
        {errors.idSkill && <div>{errors?.idSkill}</div>}

        <label>Nivel de habilidad</label>
        <select name="skillLevel" onChange={changeHandler} onBlur={blurHandler} value={data.skillLevel}>
          <option value='' >Nivel</option>
          <option value={"bajo"}>Bajo</option>
          <option value={"intermedio"}>Intermedio</option>
          <option value={"alto"}>Alto</option>
        </select>
        {errors.skillLevel && <div>{errors?.skillLevel}</div>}

        <BasicButton buttonName={'Agregar Habilidad'} buttonHandler={addSkill} />


        <table>
          <caption>Habilidades</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {newSkills.map((ns, index) => (
              <tr key={index}>
                <td>{obtenerSkillNamePorId(ns.idSkill)}</td>
                <td>{ns.skillLevel}</td>
                <td><button> <FontAwesomeIcon icon={faTrash} /> </button></td>
              </tr>
            ))}
          </tbody>
        </table >

      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
        <BasicButton buttonName={'Guardar'} buttonHandler={moveForwardHandler} />
      </div>

    </div>
  )
}

export default FormSkillsData
