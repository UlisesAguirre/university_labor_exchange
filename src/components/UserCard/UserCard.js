import React, { useContext } from 'react'
import Spinner from "../Shared/Spinner/Spinner"

import "./userCard.css"
import { ThemeContext } from '../Context/ThemeContext/ThemeContext'
import useGetBySomething from '../../custom/UseGetBySomething';
import UserContext from '../Context/UserContext/UserContext';
import { Link } from 'react-router-dom';

const UserCard = () => {
  const { theme } = useContext(ThemeContext);

  const { user } = useContext(UserContext);

  const { data, loading } = useGetBySomething('Aca poner el endpoint de getprofile', user.username);

  const dataPrueba = "";


  return (
    <div className='userCard-container'>
      {loading && <Spinner />}
      {dataPrueba.length === 0 ?
        <div className={`profile-title-card ${theme}`}>
          <p>¡ Bienvenido a la bolsa de trabajo !</p>
        </div> :
        <div className={`profile-name-card ${theme}`}>
          <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
          <h2>John Doe</h2>
        </div>}
      {dataPrueba.length === 0 ?
        <div className={`profile-message-card ${theme}`}>
          <p>Te recomendamos que termines de completar tus datos para poder acceder a las
            postulaciones.
          </p>
          <Link to="/profile/editprofile" className='button'>Completar mis datos</Link>
        </div> :
        <>
          <div className="profile-data-card">
            <div className={`profile-data-box ${theme}`}>
              <h2>Datos de contacto:</h2>
              <ul>
                <li>Rosario - Santa Fe</li>
                <li>Argentina</li>
                <li>+54-341-6456789</li>
                <li>example@gmail.com</li>
              </ul>
            </div>
            <div className={`profile-data-box ${theme}`}>
              <h2>Info carrera:</h2>
              {/* Hacer un .map con los datos que vienen del back */}

              <ul>
                <li>Ingenieria en sistemas</li>
                <li>Plan 2002</li>
                <li>Cursando: 2° año</li>
                <li>Promedio: 8.1</li>
              </ul>

            </div>
            <div className={`profile-data-box ${theme}`}>
              <h2>Skills:</h2>

            </div>
          </div>
        </>}
    </div>
  )
}

export default UserCard