import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPen, faUsers, faBriefcase, faScrewdriverWrench, faGraduationCap, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
      <h2>¡Bienvenido!</h2>
        {user.userType !== "admin" ?
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
              Perfil
            </Link>
            <Link to="/profile/editprofile">
              <FontAwesomeIcon icon={faUserPen} />
              Editar perfil
            </Link>
          </> :
          <>
            <p>Habilitar:</p>
            <Link to="/profile/users-management">
              <FontAwesomeIcon icon={faUsers} />
              Usuarios
            </Link>
            <Link to="/profile/jobpositions-management">
              <FontAwesomeIcon icon={faBriefcase} />
              Ofertas laborales
            </Link>
            <p>Administrar:</p>
            <Link to="/profile/careers-management">
              <FontAwesomeIcon icon={faGraduationCap} />
              Carreras
            </Link>
            <Link to="/profile/skills-management">
              <FontAwesomeIcon icon={faScrewdriverWrench} />
              Habilidades
            </Link>
          </>}
        {user.userType === "student" &&
          <Link to="/profile/view-offers">
            <FontAwesomeIcon icon={faBriefcase} />
            Ofertas laborales</Link>}

        {user.userType === "company" &&
          <Link to='/profile/add-offer'>
            <FontAwesomeIcon icon={faBriefcase} />
            Ofertas realizadas
          </Link>}
      </div>
      <div className='userMenu-logout'>
        <Link to="/" onClick={logoutSession} className='button'>
          <FontAwesomeIcon icon={faRightFromBracket} className='job-position-icon'/>
          <span>Cerrar sesión</span>
        </Link>
      </div>

    </div>
  )
}

export default UserMenu