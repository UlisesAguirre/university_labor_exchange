import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./cardButton.css"

const CardButton = ({ icon, name, setTypeForm}) => {

    const typeFormHandler = () => {
        setTypeForm(name)
    }

    return (
        <div className={name === "Soy alumno" ? 'card-container-student' : 'card-container-company'}>
            <button className={name === "Soy alumno" ? 'card-box-student':'card-box-company'} onClick={typeFormHandler}>
                <div className='card-icon'><FontAwesomeIcon icon={icon} /></div>
                <h2>{name}</h2>
            </button>
        </div>
    )
}

export default CardButton