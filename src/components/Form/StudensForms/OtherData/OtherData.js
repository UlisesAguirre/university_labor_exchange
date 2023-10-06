import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";

// TODO: 
// Agregar estilos
// agregar validaciones al campo de cv

const validateData = (data, name) => {

  let error = '';

  if (regex[name]) {
    if (!regex[name].test(data[name])) {
      if (name === 'secondaryDegree') {
        error = "El título secundario debe estar compuesto únicamente por caracteres del alfabeto español y tener un límite máximo de 60 caracteres."
      }
      if (name === 'observations') {
        error = "Las observaciones deben consistir únicamente en caracteres alfanuméricos y tener un límite máximo de 400 caracteres."
      }
    }
  }

  return error;
}

const regex = {
  secondaryDegree: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{0,60}$/,
  observations: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,400}$/,
};

const FormOtherData = ({ form, stepForwardHandler, stepBackHandler }) => {

  const inicialData = {
    secondaryDegree: form.secondaryDegree,
    githubProfileUrl: form.githubProfileUrl,
    linkedInProfileUrl: form.linkedInProfileUrl,
    curriculumVitae: form.curriculumVitae,
    observations: form.observations,
  };

  const {
    data,
    errors,
    changeHandler,
    blurHandler,
    moveForwardHandler,
    moveBackHandler
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
        <input type='text' name="linkedInProfileUrl" placeholder="https://www.linkedin.com/in/urlPerfil" value={data.secondaryDegree} onChange={changeHandler} onBlur={blurHandler} />
        {errors.linkedInProfileUrl && <div>{errors?.linkedInProfileUrl}</div>}

        <label>curriculum Vitae </label>
        <input type='file' name="curriculumVitae" value={data.curriculumVitae} onChange={changeHandler} />


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
