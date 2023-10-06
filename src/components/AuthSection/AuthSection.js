import React, { useContext } from 'react'
import { faRightToBracket, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import UserButton from '../Shared/UserButton/UserButton'
import "./authSection.css"
import UserContext from '../Context/UserContext/UserContext';

const AuthSection = () => {

  const { user } = useContext(UserContext);

  return (
    <div className={!user ? 'authSection-container' : 'authSection-logged-container' }>
      {!user ?
        <>
          <UserButton to="/login" buttonName="Iniciar sesion" icon={faRightToBracket} />
          <UserButton to="/signup" buttonName="Registrarse" icon={faPenToSquare} />
        </> :
        <>
        <UserButton to="/profile" buttonName={user.username} icon={faUser} />
        </>}
    </div>
  )
}

export default AuthSection