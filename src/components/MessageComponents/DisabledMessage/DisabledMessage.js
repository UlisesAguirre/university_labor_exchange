import React, { useContext } from 'react'
import disabledImg from "../../../assets-img/access-denied.png"
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'

import "./disabledMessage.css"

const DisabledMessage = () => {

    const {theme} = useContext(ThemeContext);

    return (
        <div className={`disabledMessage-container ${theme}`}>
            <div className='disabledMessage-description'>
                <p>Lamentamos informarte que tu cuenta ha sido deshabilitada. Para mas información, contactarte con
                    administración.</p>
                <p>¡Muchas gracias!</p>
            </div>
            <div className='disabledMessage-img'>
                <img src={disabledImg} alt="" />
            </div>
        </div>
    )
}

export default DisabledMessage