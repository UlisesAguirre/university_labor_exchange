import React, { useState } from 'react'
import Card from '../../components/Shared/Card/Card'
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'
import FormRegister from '../../components/Form/FormRegister/FormRegister'

import "./signup.css"

const Signup = () => {

  const [typeForm, setTypeForm] = useState("");

  return (
    <div className='signup-container'>
      {typeForm === "" ? (
        <>
          <Card icon={faUser} name="Soy alumno" setTypeForm={setTypeForm} />
          <Card icon={faBuilding} name="Soy empresa" setTypeForm={setTypeForm} />
        </>
      ) : typeForm === "Soy alumno" ? 
      <FormRegister typeForm={typeForm} setTypeForm={setTypeForm} /> : 
      <FormRegister typeForm={typeForm} setTypeForm={setTypeForm} /> }
    </div>
  )
}

export default Signup