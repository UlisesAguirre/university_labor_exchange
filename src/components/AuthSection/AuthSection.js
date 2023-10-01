import React, { useContext } from 'react'
import { faRightToBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserButton from '../Shared/UserButton/UserButton'
import "./authSection.css"
import UserContext from '../Context/UserContext/UserContext';

const AuthSection = () => {

  const { user } = useContext(UserContext);

  return (
    <div className='authSection-container'>
      {!user &&
        <>
          <UserButton to="/login" buttonName="Iniciar sesion" icon={faRightToBracket} />
          <UserButton to="/signup" buttonName="Registrarse" icon={faPenToSquare} />
        </>}
    </div>
  )
}

export default AuthSection