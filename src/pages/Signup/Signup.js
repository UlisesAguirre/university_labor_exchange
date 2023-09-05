import React, { useState } from 'react'
import CardButton from '../../components/Shared/CardButton/CardButton'
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'
import FormRegister from '../../components/Form/FormRegister/FormRegister'

import "./signup.css"

const Signup = () => {

  const [typeForm, setTypeForm] = useState("");

  return (
    <div className='signup-container'>
      {typeForm === "" ? (
        <>
          <CardButton icon={faUser} name="Soy alumno" setTypeForm={setTypeForm} />
          <CardButton icon={faBuilding} name="Soy empresa" setTypeForm={setTypeForm} />
        </>
      ) : typeForm === "Soy alumno" ? 
      <FormRegister typeForm={typeForm} setTypeForm={setTypeForm} /> : 
      <FormRegister typeForm={typeForm} setTypeForm={setTypeForm} /> }
    </div>
  )
}

export default Signup