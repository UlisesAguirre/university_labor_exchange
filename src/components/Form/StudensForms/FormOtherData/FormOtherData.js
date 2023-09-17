import useFrom from "../../../../custom/useForm";

const inicialForm = {
  secondaryDegree: '',
  curriculumVitae: '',
  observations: '',
};

const validateForm = (form, name) => {

  let error = '';

  let regex = {
    secondaryDegree: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{0,60}$/, //solo caracteres en español +  0 hasta 60
    observations: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,400}$/,
  };

  if(!regex.secondaryDegree.test(form.secondaryDegree)){
    error = "El título secundario debe estar compuesto únicamente por caracteres del alfabeto español y tener un límite máximo de 60 caracteres."
  }

  if(!regex.observations.test(form.observations)){
    error = "Las observaciones deben consistir únicamente en caracteres alfanuméricos y tener un límite máximo de 400 caracteres."
  }

  return error;
}

const FormOtherData = () => {
  const {
    form,
    errors,
    loading,
    response,
    changeHandler,
    blurHandler,
    submitHandler,
  } = useFrom ({ inicialForm, validateForm });



  return (
    <div className='formLogin-container'>
      <p className='title-formLogin'> Otros </p>
      <form className='formLogin-box' onChange={submitHandler}>

        <label> Título secundario </label>
        <input type='text' name="secondaryDegree" value={form.secondaryDegree} onChange={changeHandler} onBlur={blurHandler} />
        {errors.secondaryDegree && <div>{errors?.secondaryDegree}</div>}


        <label>curriculum Vitae </label>
        <input type= 'file' name="curriculumVitae" value={form.curriculumVitae} onChange={changeHandler}/>


        <label>Observaciones</label>
        <textarea name='observations' value={form.observations} onChange={changeHandler} onBlur={blurHandler}></textarea>
        {errors.observations && <div>{errors?.observations}</div>}

      </form>
    </div>
  )

}

export default FormOtherData
