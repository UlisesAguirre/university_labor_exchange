import useFrom from "../../../../custom/useForm";
import BasicButton from "../../../Shared/BasicButton/BasicButton";

// TODO: 
// Agregar estilos
// agregar validaciones al campo de cv

const inicialData = {
  secondaryDegree: '',
  curriculumVitae: '',
  observations: '',
};

const validateData = (data, name) => {

  let error = '';

  let regex = {
    secondaryDegree: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{0,60}$/, //solo caracteres en español +  0 hasta 60
    observations: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,400}$/,
  };

  if (!regex.secondaryDegree.test(data.secondaryDegree)) {
    error = "El título secundario debe estar compuesto únicamente por caracteres del alfabeto español y tener un límite máximo de 60 caracteres."
  }

  if (!regex.observations.test(data.observations)) {
    error = "Las observaciones deben consistir únicamente en caracteres alfanuméricos y tener un límite máximo de 400 caracteres."
  }

  return error;
}

const FormOtherData = ({ stepForwardHandler, stepBackHandler }) => {

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

        <label> Título secundario </label>
        <input type='text' name="secondaryDegree" placeholder="Bachiller en Ciencias Naturales" value={data.secondaryDegree} onChange={changeHandler} onBlur={blurHandler} />
        {errors.secondaryDegree && <div>{errors?.secondaryDegree}</div>}


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
