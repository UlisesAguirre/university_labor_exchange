import React, { useContext, useState } from 'react'

import "./userMenu.css"
import { Link } from 'react-router-dom'
import TokenContext from '../Context/TokenContext/TokenContext';
import UserContext from '../Context/UserContext/UserContext';

const UserMenu = () => {

  const { user } = useContext(UserContext);

  const { deleteToken } = useContext(TokenContext);
  const { logout } = useContext(UserContext);

  const logoutSession = () => {
    logout();
    deleteToken();
  };

  return (
    <div className='userMenu-container'>
      <div className='userMenu-options'>
        {user.userType !== "admin" ?
          <>
            <Link to="/profile">Perfil</Link>
            <Link to="/profile/editprofile">Editar perfil</Link>
          </> :
          <>
            <Link to="">Administrar usuarios</Link>
            <Link to="">Administrar ofertas</Link>
          </>}
        {user.userType === "student" && <Link>Ofertas laborales</Link>}
        {user.userType === "company" && <Link>Ofertas realizadas</Link>}
        {user.userType === "admin" && <Link></Link>}
      </div>
      <div>
        <Link to="/" onClick={logoutSession}>Cerrar sesión</Link>
      </div>

    </div>
  )
}

export default UserMenu