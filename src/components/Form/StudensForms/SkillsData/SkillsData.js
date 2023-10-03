import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";


const validateData = (data, name) => {

  let error = '';

  return error;
}


const FormSkillsData = ({ form, stepBackHandler, stepForwardHandler }) => {

  const inicialData = {
    skills: [
      {
        skillId: '',
        skillLevel: '',
      }
    ]
  }

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveBackHandler,
    moveForwardHandler
  } = useFrom({ inicialData, validateData, stepBackHandler, stepForwardHandler })

  return (
    <div>

      <p>Skills form</p>
      {console.log(data)}

      <div>

        <label>Skills</label>
        <select name="skill" onChange={changeHandler} onBlur={blurHandler} value={data.skills.skillId}>
          <option value={'1'}>AutoCad</option>
          <option value={'2'}>Net</option>
        </select>
        {errors.skill && <div>{errors?.skill}</div>}

        <label>Level</label>
        <select name="level" onChange={changeHandler} onBlur={blurHandler} value={data.skills.skillLevel}>
          <option value={"bajo"}>Bajo</option>
          <option value={"intermedio"}>Intermedio</option>
          <option value={"alto"}>Alto</option>
        </select>
        {errors.level && <div>{errors?.level}</div>}


        {/* <table>
          <caption>Habilidades</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
          {data.skills.map((skillId, skillLevel, skillName) =>
            <tr key={skillId}>
              <th>{skillName}</th>
              <th>{skillLevel}</th>
            </tr>
          )}
          </tbody>
        </table> */}
  

      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
        <BasicButton buttonName={'Guardar'} buttonHandler={moveForwardHandler} />
      </div>

    </div>
  )
}

export default FormSkillsData
