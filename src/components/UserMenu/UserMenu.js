import React, { useContext, useState } from 'react'

import "./userMenu.css"
import { Link } from 'react-router-dom'
import TokenContext from '../Context/TokenContext/TokenContext';
import UserContext from '../Context/UserContext/UserContext';

const UserMenu = () => {

  const [userType, setUserType] = useState("Student");

  const {deleteToken} = useContext(TokenContext);
  const {logout} = useContext(UserContext);

  const logoutSession = () => {
    logout();
    deleteToken();
  };

  return (
    <div className='userMenu-container'>
      <div className='userMenu-options'>
        <Link to="/profile">Perfil</Link>
        <Link>Editar perfil</Link>
        {userType === "Student" ?
          <Link>
          </Link> :
          <Link>
          </Link>
        }
      </div>
      <div>
        <Link to="/" onClick={logoutSession}>Cerrar sesión</Link>
      </div>

    </div>
  )
}

export default UserMenu