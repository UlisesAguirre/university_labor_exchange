import { format } from 'date-fns';
import React from 'react';
import './jobPositionCard.css'

const JobPositionCard = ({ jobPosition }) => {

    return (
        <div className="job-position-card">
            <h2>{jobPosition.jobTitle}</h2>
            <div className='job-position-info-row'>
                <h4>Posición a cubrir:</h4>
                <p>{jobPosition.positionToCover}</p>
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
    );
};

export default JobPositionCard;