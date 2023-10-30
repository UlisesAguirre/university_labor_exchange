import React, { useContext, useEffect, useState } from 'react'
import Spinner from "../Shared/Spinner/Spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import "./userCard.css"
import { ThemeContext } from '../Context/ThemeContext/ThemeContext'
import useGetBySomething from '../../custom/UseGetBySomething';
import UserContext from '../Context/UserContext/UserContext';
import { Link } from 'react-router-dom';
import DownloadCurriculum from '../DownloadCurriculum/DownloadCurriculum';
import Modal from '../Shared/Modal/Modal'
import Error from '../Shared/Error/Error'

const UserCard = () => {

  const [curriculumError, setCurriculumError ] = useState(null);

  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const { theme } = useContext(ThemeContext);

  const { user, viewOffer } = useContext(UserContext);

  const url = user && user.userType === "student" ?
    'https://university-labor-exchange.azurewebsites.net/api/Student/GetStudentProfile' :
    'https://university-labor-exchange.azurewebsites.net/api/Company/GetCompanyProfile';

  const [dataUser, setDataUser] = useState("");

  const { data, loading, error } = useGetBySomething(url, user.id);

  useEffect(() => {
    if (data) {
      setDataUser(data);

      if (data.telephoneNumber != null) {
        viewOffer();
      }
    }
  }, [data]);

  return (
    <>
      {error || curriculumError ? <Error error= { error ? error : curriculumError}/> :
        <>
          <div className='userCard-container'>
            {loading && <Spinner />}
            {dataUser.telephoneNumber == null ?
              <div className={`profile-title-card ${theme}`}>
                <p>¡ Bienvenido a la bolsa de trabajo !</p>
              </div> :
              <div className={`profile-name-card ${theme}`}>
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
                  <h2 className='userCard-username'>{dataUser.username}</h2>
                </div>
                {user.userType === "student" &&
                  (dataUser.careerNotification !== null && dataUser.careerNotification > 0) && (
                    <div className='userCard-notifications'>
                      <Link to="/profile/view-offers" className='userCard-notifications-link'>
                        <div className='userCard-notifications-icon'>
                          <FontAwesomeIcon icon={faBell} />
                        </div>
                        <div className='userCard-notifications-description'>
                          <p>Hay <b>{dataUser.careerNotification}</b> ofertas nuevas relacionadas con tu carrera:</p>
                          <p>¡Míralas ahora!</p>
                        </div>
                      </Link>
                    </div>
                  )
                }

                {user.userType === "student" ? <DownloadCurriculum userid={user.id} name={dataUser.name} lastName={dataUser.lastName} setModal={setModal} setCurriculumError={setCurriculumError}/> : <></>}

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
                      <div>
                        <span>Nombre completo:</span>
                        <span>{dataUser.name} {dataUser.lastName}</span>
                      </div>
                      <div>
                        <span>Ciudad:</span>
                        <span>{dataUser.city}, {dataUser.province}</span>
                      </div>
                      <div>
                        <span>Pais:</span>
                        <span>{dataUser.country}</span>
                      </div>
                      <div>
                        <span>Telefono:</span>
                        <span>{dataUser.telephoneNumber}</span>
                      </div>
                      <div>
                        <span>Email:</span>
                        <span>{dataUser.email}</span>
                      </div>
                      {dataUser.linkedInProfileUrl !== null &&
                        <div>
                          <span>LinkedIn:</span>
                          <span><a href={dataUser.linkedInProfileUrl}>{dataUser.linkedInProfileUrl}</a></span>
                        </div>
                      }
                      {dataUser.githubProfileUrl !== null &&
                        <div>
                          <span>GitHub:</span>
                          <span><a href={dataUser.githubProfileUrl}>{dataUser.githubProfileUrl}</a></span>
                        </div>
                      }

                    </div>
                    <div className={`profile-data-box ${theme}`}>
                      <h2>Perfil academico:</h2>
                      <div>
                        <span>Carrera:</span>
                        <span>{dataUser.careerName}</span>
                      </div>
                      <div>
                        <span>Cursando:</span>
                        <span>{dataUser.currentCareerYear}° año</span>
                      </div>
                      <div>
                        <span>Promedio:</span>
                        <span>{dataUser.average}</span>
                      </div>
                      <div>
                        <span>Materias aprobadas:</span>
                        <span>{dataUser.approvedSubjects}</span>
                      </div>
                    </div>
                    <div className={`profile-data-box ${theme}`}>
                      <h2>Skills:</h2>
                      {dataUser.studentsSkills.map((skill) => {
                        return <div key={skill.idSkill}>
                          <span>{skill.skillName}</span>
                          <span>{skill.skillLevel}</span>
                        </div>
                      })}
                    </div>
                  </div>
                </> :
                <div className={`profile-company-card ${theme}`}>
                  <h2>Datos de la empresa:</h2>
                  <div>
                    <span>Nombre:</span>
                    <span>{dataUser.companyName}</span>
                  </div>
                  <div>
                    <span>Razon social:</span>
                    <span>{dataUser.socialReason}</span>
                  </div>
                  <div>
                    <span>Cuit:</span>
                    <span>{dataUser.cuit}</span>
                  </div>
                  <div>
                    <span>Sector:</span>
                    <span>{dataUser.sector}</span>
                  </div>
                  <div>
                    <span>Email:</span>
                    <span>{dataUser.email}</span>
                  </div>
                  {dataUser.web !== null &&
                    <div>
                      <span>Pagina web:</span>
                      <span><a href={dataUser.web}>{dataUser.web}</a></span>
                    </div>
                  }
                </div>
            }
            {modal.modalOpen && (
              <Modal
                title={modal.modalTitle}
                message={modal.modalMessage}
                onClose={() => setModal({ modalOpen: false })}
              />
            )}

          </div>
        </>}
    </>
  )
}

export default UserCard