import { useContext} from "react";
import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";

import "./otherData.css"
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import Curriculum from "./Curriculum";


// TODO: 
// Agregar estilos

const validateData = (data, name) => {

  let error = '';

  if (data[name] !== 'curriculum' && (data[name] !== null && data[name] !== '')) {
    if (regex[name]) {
      if (!regex[name].test(data[name])) {
        if (name === 'observations') {
          error = "Las observaciones deben consistir únicamente en caracteres alfanuméricos y tener un límite máximo de 400 caracteres."
        }
        if (name === 'githubProfileUrl') {
          error = "La URL de GitHub debe tener un formato valido, como 'https://github.com/usuario/repositorio' o 'github.com/usuario/repositorio'."
        }
        if (name === 'linkedInProfileUrl') {
          error = "La URL de LinkedIn debe tener un formato valido, como 'https://www.linkedin.com/in/nombre-de-usuario' o 'linkedin.com/in/nombre-de-usuario'."
        }
      }
    }
  }

  return error;
}

const regex = {
  observations: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,400}$/,
  githubProfileUrl: /^(https:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
  linkedInProfileUrl: /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
};

const FormOtherData = ({ form, stepForwardHandler, stepBackHandler, userId }) => {

  const { theme } = useContext(ThemeContext);

  const inicialData = {
    githubProfileUrl: form.githubProfileUrl,
    linkedInProfileUrl: form.linkedInProfileUrl,
    observations: form.observations,
  };

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
    moveBackHandler,
  } = useFrom({ inicialData, validateData, stepForwardHandler, stepBackHandler })


  return (
    <div className="otherData-container">
      <h2 > Otros </h2>
      <div className={`otherData-form ${theme}`}>
        <label> Link de GitHub </label>
        <input type='text' name="githubProfileUrl" placeholder="https://github.com/UsuarioDeGit/NombreRepositorio" value={data.githubProfileUrl} onChange={changeHandler} onBlur={blurHandler} />
        {errors.githubProfileUrl && <div className="form-user-error-message">{errors?.githubProfileUrl}</div>}

        <label> Link de Linkedin </label>
        <input type='text' name="linkedInProfileUrl" placeholder="https://www.linkedin.com/in/urlPerfil" value={data.linkedInProfileUrl} onChange={changeHandler} onBlur={blurHandler} />
        {errors.linkedInProfileUrl && <div className="form-user-error-message">{errors?.linkedInProfileUrl}</div>}

        <Curriculum userId={userId}/>

        <label>Observaciones</label>
        <textarea name='observations' placeholder=" Agrega observaciones y/o información curricular adicional " value={data.observations} onChange={changeHandler} onBlur={blurHandler}></textarea>
        {errors.observations && <div className="form-user-error-message">{errors?.observations}</div>}

      </div>

      <div>
        <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
        <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
      </div>
    </div>
  )

}

export default FormOtherData