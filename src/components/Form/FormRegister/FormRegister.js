import React from 'react'
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'
import "./formRegister.css"
import Card from '../../Shared/Card/Card'
import FullForm from '../FullForm/FullForm'

const FormRegister = ({typeForm, setTypeForm}) => {

  return (
    <div className='formRegister-container'>
      <div className='form-div'>
        {typeForm === "Soy alumno" ? 
        <FullForm title="Registrarse como alumno:" nameButton="Registrarse" typeForm={typeForm}/> : 
        <Card name="Soy alumno" icon={faUser} setTypeForm={setTypeForm}/>} 
      </div>
      <div className='form-div'>
        {typeForm === "Soy alumno" ? 
        <Card name="Soy empresa" icon={faBuilding} setTypeForm={setTypeForm}/> : 
        <FullForm title="Registrarse como empresa:" nameButton="Registrarse" typeForm={typeForm}/>}
      </div>
    </div>
  )
}

export default FormRegister