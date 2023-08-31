import React from 'react'
import { faRightToBracket, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import UserButton from '../Shared/UserButton/UserButton'
import "./authSection.css"

const AuthSection = () => {
  return (
    <div className='authSection-container'>
        <UserButton to="/login" buttonName="Iniciar sesion" icon={faRightToBracket}/>
        <UserButton to="/signup" buttonName="Registrarse" icon={faPenToSquare}/>
    </div>
  )
}

export default AuthSection