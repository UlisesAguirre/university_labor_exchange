import React from 'react'
import Card from '../../components/Shared/Card/Card'
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'

import "./signup.css"

const Signup = () => {
  return (
    <div className='signup-container'>
      <Card icon={faUser} name="Soy alumno" />
      <Card icon={faBuilding} name="Soy empresa" />
    </div>
  )
}

export default Signup