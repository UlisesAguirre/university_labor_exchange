import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./card.css"
import { Link } from 'react-router-dom'

const Card = ({ icon, name }) => {
    return (
        <div className='card-container'>
            <Link className='card-box'>
                    <div className='card-icon'><FontAwesomeIcon icon={icon} /></div>
                    <h2>{name}</h2>
            </Link>
        </div>
    )
}

export default Card