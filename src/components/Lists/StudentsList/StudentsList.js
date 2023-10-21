import React, { useState } from 'react'
import ListCard from "../ListCard/ListCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons'

const StudentsList = ({ student, stateOnClick }) => {

    const [menuVisible, setMenuVisible] = useState(false);


    return (
        <div className='generic-list-container'>
            <ListCard menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <div className='title-generic-list'>
                    <p>{student.username}</p>
                    <p>Legajo: {student.legajo}</p>
                </div>
                <div className='data-generic-list'>
                    <p>Email: {student.email}</p>
                    {student.state === 0 ? <p className="enabled-state">Estado: Habilitado</p> :
                        student.state === 1 ? <p className="disabled-state">Estado: Deshabilitado</p> :
                            <p className="unassigned-state">Estado: Sin asignar</p>}

                </div>
                <div className={!menuVisible ? 'arrow-generic-list' : "arrow-generic-list-disabled"}>
                    {!menuVisible ? <FontAwesomeIcon icon={faCircleUp} /> : <FontAwesomeIcon icon={faCircleDown} />}
                </div>
                {menuVisible && (
                    <div className="button-generic-list">
                        <p>¿Deseas cambiar el estado del alumno?</p>
                        <div className='button-generic-box'>
                            <button className='button' onClick={() => stateOnClick("Alumno habilitado", 0, student.idUser)}>
                                Habilitar
                            </button>
                            <button className='button' onClick={() => stateOnClick("Alumno deshabilitado", 1, student.idUser)}>
                                Deshabilitar
                            </button>
                        </div>
                    </div>
                )}
            </ListCard>
        </div>
    )
}

export default StudentsList