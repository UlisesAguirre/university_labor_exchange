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
        {user.state === "Habilitado" && <>
          {user.userType !== "admin" ?
            <>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} /> Perfil
              </Link>
              <Link to="/profile/editprofile">
                <FontAwesomeIcon icon={faUserPen} /> Editar perfil
              </Link>
            </> :
            <>
              <div className='admin-options-column'>
                <p>Habilitar:</p>
                <Link to="/profile/admin/users-management">
                  <FontAwesomeIcon icon={faUsers} /> Usuarios
                </Link>
                <Link to="/profile/admin/jobpositions-management">
                  <FontAwesomeIcon icon={faBriefcase} /> Ofertas laborales
                </Link>
              </div>
              <div className='admin-options-column'>
                <p>Administrar:</p>
                <Link to="/profile/admin/careers-management">
                  <FontAwesomeIcon icon={faGraduationCap} /> Carreras
                </Link>
                <Link to="/profile/admin/skills-management">
                  <FontAwesomeIcon icon={faScrewdriverWrench} /> Habilidades
                </Link>
              </div>
            </>}
          {user.viewOffer && <>
            {user.userType === "student" &&
              <Link to="/profile/view-offers">
                <FontAwesomeIcon icon={faBriefcase} /> Ofertas laborales</Link>}

            {user.userType === "company" &&
              <Link to='/profile/add-offer'>
                <FontAwesomeIcon icon={faBriefcase} /> Ofertas laborales
              </Link>}
          </>
          }

        </>
        }
      </div>

      <div className='userMenu-logout'>
        <Link to="/" onClick={logoutSession} className='button'>
          <FontAwesomeIcon icon={faRightFromBracket} className='job-position-icon' />
          <span>Cerrar sesión</span>
        </Link>
      </div>

    </div>
  )
}

export default UserMenu