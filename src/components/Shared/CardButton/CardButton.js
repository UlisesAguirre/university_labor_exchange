import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./cardButton.css"

const CardButton = ({ icon, name, setTypeForm}) => {

    const typeFormHandler = () => {
        setTypeForm(name)
    }

    return (
        <div className='card-container'>
            <button className='card-box' onClick={typeFormHandler}>
                <div className='card-icon'><FontAwesomeIcon icon={icon} /></div>
                <h2>{name}</h2>
            </button>
        </div>
    )
}

export default CardButton