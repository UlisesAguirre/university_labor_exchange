import React, { useContext } from 'react'
import waitingImg from "../../../assets-img/waiting.png"
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'

import "./unasignedMessage.css"

const UnasignedMessage = () => {

    const {theme} = useContext(ThemeContext);

  return (
    <div className={`unasignedMessage-container ${theme}`}>
        <div className='unasignedMessage-description'>
            <p>Tu cuenta esta en proceso de habilitación. Por favor, espere a que uno de nuestros administradores
            revise la solicitud.</p>
            <p>¡Muchas gracias!</p>
        </div>
        <div className='unasignedMessage-img'>
            <img src={waitingImg} alt="" />
        </div>
    </div>
  )
}

export default UnasignedMessage