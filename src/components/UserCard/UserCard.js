import React, { useContext, useEffect, useState } from 'react'
import Spinner from "../Shared/Spinner/Spinner"

import "./userCard.css"
import { ThemeContext } from '../Context/ThemeContext/ThemeContext'
import useGetBySomething from '../../custom/UseGetBySomething';
import UserContext from '../Context/UserContext/UserContext';
import { Link } from 'react-router-dom';

const UserCard = () => {
  const { theme } = useContext(ThemeContext);

  const { user } = useContext(UserContext);

  const url = user.userType === "student" ? 
  'https://localhost:7049/api/Student/GetStudentProfile' :
  'https://localhost:7049/api/Company/GetCompanyProfile' ;

  const [dataUser, setDataUser] = useState(" ");


  const { data, loading, error } = useGetBySomething( url, user.id);

  useEffect(() => {
    if (data) {
      setDataUser(data);
      console.log(data);
    }
  }, [data]);


  return (
    <div className='userCard-container'>
      {loading && <Spinner />}
      {Object.values(dataUser).includes(null) ?
        <div className={`profile-title-card ${theme}`}>
          <p>¡ Bienvenido a la bolsa de trabajo !</p>
        </div> :
        <div className={`profile-name-card ${theme}`}>
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
            <h2>{dataUser.username}</h2>
          </div>
          {user.userType === "student" ? <button className='button'>Descargar cv</button> : <></>}
          
        </div>}
        {/* FIXME: hay datos nulls en el student porque no son requeridos 
        cambiar logica cuando tengamos un campo en student bool para esto  */}
      {Object.values(dataUser).includes(null) ?
        <div className={`profile-message-card ${theme}`}>
          <p>Te recomendamos que termines de completar tus datos para poder acceder a las
            postulaciones.
          </p>
          <Link to="/profile/editprofile" className='button'>Completar mis datos</Link>
        </div> :
        user.userType === "student" ?
          <>
            <div className="profile-data-card">
              <div className={`profile-data-box ${theme}`}>
                <h2>Datos del perfil:</h2>
                <ul>
                  <li>{dataUser.name} {dataUser.lastName}</li>
                  <li>{dataUser.city}, {dataUser.province}</li>
                  <li>{dataUser.country}</li>
                  <li>{dataUser.telephoneNumber}</li>
                  <li>{dataUser.email}</li>
                  <li><a href={dataUser.linkedInProfileUrl}>{dataUser.linkedInProfileUrl}</a></li>
                  <li><a href={dataUser.githubProfileUrl}>{dataUser.githubProfileUrl}</a></li>
                </ul>
              </div>
              <div className={`profile-data-box ${theme}`}>
                <h2>Info carrera:</h2>
                <ul>
                  <li>{dataUser.career/* ACA HAY QUE VER EL TEMA DE LAS CARRERAS*/}</li>
                  <li>Cursando: {dataUser.currentCareerYear}° año</li>
                  <li>Promedio: {dataUser.average}</li>
                  <li>Materias aprobadas: {dataUser.approvedSubjects}</li>
                </ul>

              </div>
              <div className={`profile-data-box ${theme}`}>
                <h2>Skills:</h2>
                {/* Hay que mapear las habilidades una vez armadas*/}

              </div>
            </div>
          </> : 
          <div className={`profile-company-card ${theme}`}>
            <h2>Datos de la empresa:</h2>
            <ul>
              <li>{dataUser.socialReason}</li>
              <li>{dataUser.cuit}</li>
              <li>{dataUser.sector}</li>
              <li>{dataUser.email}</li>
              <li><a href={dataUser.web}>{dataUser.web}</a></li>
            </ul>
          </div>
      }
    </div>
  )
}

export default UserCard