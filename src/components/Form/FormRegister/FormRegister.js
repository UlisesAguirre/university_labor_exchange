import React from 'react'
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'
import "./formRegister.css"
import CardButton from '../../Shared/CardButton/CardButton'
import FullForm from '../FullForm/FullForm'

const FormRegister = ({typeForm, setTypeForm}) => {

  return (
    <div className='formRegister-container'>
      <div className={ typeForm === "Soy alumno" ? 'form-div-student' : "form-div"}>
        {typeForm === "Soy alumno" ? 
        <FullForm title="Registrarse como alumno:" nameButton="Registrarse" typeForm={typeForm}/> : 
        <CardButton name="Soy alumno" icon={faUser} setTypeForm={setTypeForm}/>} 
      </div>
      <div className={ typeForm === "Soy empresa" ? 'form-div-company' : "form-div"}>
        {typeForm === "Soy alumno" ? 
        <CardButton name="Soy empresa" icon={faBuilding} setTypeForm={setTypeForm}/> : 
        <FullForm title="Registrarse como empresa:" nameButton="Registrarse" typeForm={typeForm}/>}
      </div>
    </div>
  )
}

export default FormRegister