import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";

// TODO: 
// Agregar estilos
// Cambiar curriculumV a curriculum cuando lo carguemos a la base de datos


const validateData = (data, name) => {

  let error = '';

  if (data[name] !== null && data[name] !== '') {
    if (regex[name]) {
      if (name = 'curriculumV') {
        if (!regex[name].test(data[name].name)) {
          error = 'Solo se aceptan las extenciones .jpg .jpeg .png .pdf'
        }
      } else if (!regex[name].test(data[name])) {
        if (name === 'secondaryDegree') {
          error = "El título secundario debe estar compuesto únicamente por caracteres del alfabeto español y tener un límite máximo de 60 caracteres."
        }
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
  secondaryDegree: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{0,60}$/,
  observations: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,400}$/,
  githubProfileUrl: /^(https:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
  linkedInProfileUrl: /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
  curriculumV: /(.jpg|.jpeg|.png|.pdf)$/i
};

const FormOtherData = ({ form, stepForwardHandler, stepBackHandler }) => {

  const inicialData = {
    secondaryDegree: form.secondaryDegree,
    githubProfileUrl: form.githubProfileUrl,
    linkedInProfileUrl: form.linkedInProfileUrl,
    curriculumV: form.curriculumV,
    observations: form.observations,
  };

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
    moveBackHandler,
    changeFileHandler
  } = useFrom({ inicialData, validateData, stepForwardHandler, stepBackHandler })


  return (
    <div>
      <p > Otros </p>
      <div>

        {/* <label> Título secundario </label>
        <input type='text' name="secondaryDegree" placeholder="Bachiller en Ciencias Naturales" value={data.secondaryDegree} onChange={changeHandler} onBlur={blurHandler} />
        {errors.secondaryDegree && <div>{errors?.secondaryDegree}</div>} */}

        <label> Link de GitHub </label>
        <input type='text' name="githubProfileUrl" placeholder="https://github.com/UsuarioDeGit/NombreRepositorio" value={data.githubProfileUrl} onChange={changeHandler} onBlur={blurHandler} />
        {errors.githubProfileUrl && <div>{errors?.githubProfileUrl}</div>}

        <label> Link de Linkedin </label>
        <input type='text' name="linkedInProfileUrl" placeholder="https://www.linkedin.com/in/urlPerfil" value={data.linkedInProfileUrl} onChange={changeHandler} onBlur={blurHandler} />
        {errors.linkedInProfileUrl && <div>{errors?.linkedInProfileUrl}</div>}

        <label>curriculumV Vitae </label>
        <input type='file' name="curriculumV" onChange={changeFileHandler} />
        {errors.curriculumV && <div>{errors?.curriculumV}</div>}

        <label>Observaciones</label>
        <textarea name='observations' placeholder=" Agrega observaciones y/o información curricular adicional " value={data.observations} onChange={changeHandler} onBlur={blurHandler}></textarea>
        {errors.observations && <div>{errors?.observations}</div>}

      </div>
      <BasicButton buttonName={'Atras'} buttonHandler={moveBackHandler} />
      <BasicButton buttonName={'Siguiente'} buttonHandler={moveForwardHandler} />
    </div>
  )

}

export default FormOtherData
