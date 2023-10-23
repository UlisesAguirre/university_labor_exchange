import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import UserContext from "../../Context/UserContext/UserContext"
import './jobPositionCard.css'
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';

const JobPositionCard = ({ jobPosition, menuVisible, setMenuVisible, forcedUpdate }) => {

    const { user } = useContext(UserContext);

    const { theme } = useContext(ThemeContext);

    const [goBackToJobPosition, setGoBacktoJobPosition] = useState(false)

    const seeApplicantsHandler = () => {
        setGoBacktoJobPosition(!goBackToJobPosition)
    }

    const applicantsList = (
        <>
            <div className='jobPosition-fixed-div'>
                <div className='job-position-title'>
                    <button className='button' onClick={seeApplicantsHandler}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="job-position-icon" />
                    </button>
                    <h2>{jobPosition.jobTitle}</h2>
                </div>
            </div>
            <ApplicantsList
                studentsJobPositions={jobPosition.studentsJobPositions}
            />
        </>

    )

    const [goBackToJobPosition, setGoBacktoJobPosition] = useState(false)

    const seeApplicantsHandler = () => {
        setGoBacktoJobPosition(!goBackToJobPosition)
    }

    const applicantsList = (
        <>
            <div className='jobPosition-fixed-div'>
                <div className='job-position-title'>
                    <button className='button' onClick={seeApplicantsHandler}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="job-position-icon" />
                    </button>
                    <h2>{jobPosition.jobTitle}</h2>
                </div>
            </div>
            <ApplicantsList
                studentsJobPositions={jobPosition.studentsJobPositions}
            />
        </>

    )

    const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();

    const url = user.userType === "admin" ? "https://localhost:7049/api/JobPosition/SetJobPositionState" :
        null //Poner los demas links

    const returnOnClick = () => {
        setMenuVisible(!menuVisible);
    };

    const stateOnClick = async (state, description) => {

        const data = {
            idJobPosition: jobPosition.idJobPosition,
            state: state,
        }

        try {
            await sendPutRequest(url,JSON.stringify(data), "application/json");
            alert(`Oferta ${description}`);
            jobPosition.state = state;
            forcedUpdate();
        }catch(putRequestError) {
            console.log("Error: ", putRequestError)
        }

    }

    return (
        <div className={`job-position-card ${theme}`}>
            {loadingPutRequest && <Spinner/>}
            {goBackToJobPosition ?
                (applicantsList)
                :
                (
                    <>
                        <div className='jobPosition-fixed-div'>
                            <div className='job-position-title'>
                                <button className='button' onClick={returnOnClick}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className="job-position-icon" />
                                </button>
                                <h2>{jobPosition.jobTitle}</h2>
                            </div>
                            <div className='jobPosition-buttons'>
                                {user.userType === "student" && <button className='button'>Postularme</button>}
                                {user.userType === "company" && jobPosition.state === 0 && <button className='button' onClick={seeApplicantsHandler}>Ver postulantes</button>}
                                {user.userType === "admin" &&
                        <>
                            {(jobPosition.state === 2 || jobPosition.state === 1) &&
                                <button
                                    className='button'
                                    onClick={() => stateOnClick(0,"habilitada")}>
                                    Habilitar
                                </button>}

                            {(jobPosition.state === 2 || jobPosition.state === 0) &&
                                <button
                                    className='button'
                                    onClick={() => stateOnClick(1, "deshabilitada")}>
                                    Deshabilitar
                                </button>}
                        </>}
                            </div>
                        </div>
                        <div className='job-position-content'>
                            <div className='job-position-info-row'>
                                <h4>Posición a cubrir:</h4>
                                <p>{jobPosition.positionToCover}</p>
                            </div>
                            <div className='job-position-info-row'>
                                <h4>Tipo de trabajo: </h4>
                                <p>{jobPosition.jobType === 'Trabajo' ? 'Relacion de Dependencia' : jobPosition.jobType}</p>
                            </div>
                            <div className='job-position-info-row'>
                                <h4>Cantidad de Puestos a Cubrir:</h4>
                                <p>{jobPosition.numberOfPositionsToCover}</p>
                            </div>
                            <div className='job-position-info'>
                                <h4>Carreras Destino:</h4>
                                {console.log(jobPosition.jobPositionsCareers)}
                                {jobPosition.jobPositionsCareers &&
                                    <ul>
                                        {jobPosition.jobPositionsCareers.map((career) =>
                                            <li key={career.idCareer}>{career.name}</li>
                                        )}
                                    </ul>
                                }

                            </div>
                            <div className='job-position-info'>
                                <h4>Descripción:</h4>
                                <p>{jobPosition.jobDescription}</p>
                            </div>
                            <div className='job-position-info'>
                                <h4>Beneficios Ofrecidos:</h4>
                                <p>{jobPosition.benefitsOfferedDetail}</p>
                            </div>
                            <div className='job-position-info-row'>
                                <h4>Lugar de Trabajo:</h4>
                                <p>{jobPosition.location}</p>
                            </div>
                            <div className='job-position-info-row'>
                                <h4>Fecha de Creación:</h4>
                                <p>{format(new Date(jobPosition.createdDate), 'dd-MM-yyyy')}</p>
                            </div>
                            <div className='job-position-info-row'>
                                <h4>Fecha de Finalización de la Oferta:</h4>
                                <p>{format(new Date(jobPosition.endDate), 'dd-MM-yyyy')}</p>
                            </div>
                            <div className='job-position-info-row'>
                                <h4>Cuit Empresa:</h4>
                                <p>{jobPosition.idCompany}</p>
                            </div>


                            {jobPosition.jobType === 'Pasantia' ?
                                <>
                                    <div className='job-position-info-row'>
                                        <h4>Fecha Tentativa de Inicio de la Pasantía:</h4>
                                        <p> {format(new Date(jobPosition.tentativeStartDate), 'dd-MM-yyyy')}</p>
                                    </div>
                                    <div className='job-position-info-row'>
                                        <h4>Duración de la Pasantía:</h4>
                                        <p>{jobPosition.internshipDuration}</p>
                                    </div>
                                </>
                                :
                                <div className='job-position-info-row'>
                                    <h4>Jornada Laboral:</h4>
                                    <p>{jobPosition.workDay}</p>
                                </div>

                            }
                            <div className='job-position-skills'>
                                {jobPosition.jobPostionsSkills &&
                                    <table>
                                        <caption><strong>Habilidades esperadas</strong></caption>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Nivel</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jobPosition.jobPostionsSkills
                                                .map((skill, index) => (
                                                    <tr key={index}>
                                                        <td>{skill.skillName}</td>
                                                        <td>Intermedio</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table >
                                }
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
};

export default JobPositionCard;