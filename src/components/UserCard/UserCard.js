import React, { useContext, useEffect, useState } from 'react'
import Spinner from "../Shared/Spinner/Spinner"

import "./userCard.css"
import { ThemeContext } from '../Context/ThemeContext/ThemeContext'
import useGetBySomething from '../../custom/useGetBySomething';
import UserContext from '../Context/UserContext/UserContext';
import { Link } from 'react-router-dom';
import DownloadCurriculum from '../DownloadCurriculum/DownloadCurriculum';

const UserCard = () => {
  const { theme } = useContext(ThemeContext);

  const { user } = useContext(UserContext);

  const url = user.userType === "student" ?
    'https://localhost:7049/api/Student/GetStudentProfile' :
    'https://localhost:7049/api/Company/GetCompanyProfile';

  const [dataUser, setDataUser] = useState(" ");


  const { data, loading, error } = useGetBySomething(url, user.id);

  useEffect(() => {
    if (data) {
      setDataUser(data);
    }
  }, [data]);

  

  return (
    <div className='userCard-container'>
      {loading && <Spinner />}
      {dataUser.telephoneNumber == null ?
        <div className={`profile-title-card ${theme}`}>
          <p>¡ Bienvenido a la bolsa de trabajo !</p>
        </div> :
        <div className={`profile-name-card ${theme}`}>
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
            <h2>{dataUser.username}</h2>
          </div>
          {user.userType === "student" ? <DownloadCurriculum userid={user.id}/> : <></>}

        </div>}

      {dataUser.telephoneNumber == null ?
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
              <li><p>Nombre: </p> {dataUser.companyName}</li>
              <li><p>Razon social: </p>{dataUser.socialReason}</li>
              <li><p>Cuit: </p>{dataUser.cuit}</li>
              <li><p>Sector: </p>{dataUser.sector}</li>
              <li><p>Email: </p>{dataUser.email}</li>
              <li><p>Pagina web: </p><a href={dataUser.web}>{dataUser.web}</a></li>
            </ul>
          </div>
      }
    </div>
  )
}

export default UserCard