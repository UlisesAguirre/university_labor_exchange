import React, { useContext } from 'react'
import DownloadCurriculum from '../../DownloadCurriculum/DownloadCurriculum'
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { useState } from 'react';
import Error from '../../Shared/Error/Error'

const ApplicantsList = ({ studentsJobPositions, setModal }) => {

    const [curriculumError, setCurriculumError] = useState(null)

    const { theme } = useContext(ThemeContext);

    return (
        <div className='jobPositionMenu-list student-list' >
            {curriculumError ?
                <Error error={curriculumError} />
                :
                <>
                    {
                        studentsJobPositions.length !== 0 ? (
                            studentsJobPositions.map((student) =>
                                <div key={student.idUser} className='generic-list-container'>
                                    <div className={`student-listCard-container ${theme}`}>
                                        <div className='data-student-list'>
                                            <p>Nombre: {student.name}</p>
                                            <p>Apellido: {student.lastName}</p>
                                            <p>Email: {student.email}</p>
                                        </div>
                                        <div className='data-student-list'>
                                            <DownloadCurriculum userid={student.idUser} name={student.name} lastName={student.lastName} setModal={setModal} setCurriculumError={setCurriculumError} />
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            (<p>No se encontrarón postulaciones</p>)
                    }
                </>
            }

        </div>
    )
}

export default ApplicantsList
