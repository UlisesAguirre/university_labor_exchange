import React, { useContext } from 'react'
import { faRightToBracket, faPenToSquare, faBars } from '@fortawesome/free-solid-svg-icons';
import UserButton from '../Shared/UserButton/UserButton'
import "./authSection.css"
import UserContext from '../Context/UserContext/UserContext';
import { useLocation } from 'react-router-dom';

const AuthSection = () => {

  const location = useLocation();

  const { user } = useContext(UserContext);

  console.log(location.pathname.startsWith)

  return (
    <div className={!user ? 'authSection-container' : 'authSection-logged-container'}>
      {!user ?
        <>
          <UserButton to="/login" buttonName="Iniciar sesion" icon={faRightToBracket} />
          <UserButton to="/signup" buttonName="Registrarse" icon={faPenToSquare} />
        </> :
        <>
        {!location.pathname.startsWith("/profile") && <UserButton to="/profile" buttonName="Menu" icon={faBars} /> }
        </>}
    </div>
  )
}

export default AuthSection