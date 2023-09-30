import React, { useContext } from 'react'

import "./userCard.css"
import { ThemeContext } from '../Context/ThemeContext/ThemeContext'

const UserCard = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div>
      <div className={`profile-name-card ${theme}`}>
        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
        <h2>John Doe</h2>
      </div>
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
    </div>
  )
}

export default UserCard