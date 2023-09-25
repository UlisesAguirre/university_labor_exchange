import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";

const inicialData = {
  skills: []
}

const validateData = (data, name) => {

  let error = '';

  return error;
}


const FormSkillsData = ({ stepBackHandler }) => {



  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
    moveBackHandler
  } = useFrom({ inicialData, validateData, stepBackHandler })

  return (
    <div>

      <p>Skills form</p>

      <div>
        
        <label>Skills</label>
        <select name="skill" onChange={changeHandler} onBlur={blurHandler} value={data.skill}>
          <option value={'AutoCad'}>AutoCad</option>
          <option value={'.Net'}>Net</option>
        </select>
        {errors.skill && <div>{errors?.skill}</div>}

        <label>Level</label>
        <select name="level" onChange={changeHandler} onBlur={blurHandler} value={data.level}>
          <option value={1}>Medio</option>
          <option value={2}>Alto</option>
        </select>
        {errors.level && <div>{errors?.level}</div>}

        <ul>
          <li></li>
        </ul>

      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
      </div>

    </div>
  )
}

export default FormSkillsData
