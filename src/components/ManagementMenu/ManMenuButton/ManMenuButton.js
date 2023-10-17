import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./manMenuButton.css"
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'


const ManMenuButton = ({ icon, name, setOption, option}) => {

    const {theme} = useContext(ThemeContext);

    const optionHandler = () => {
        setOption(option)
    }

    return (
        <div className='ManMenuButton-container'>
            <button className={`ManMenuButton-box ${theme}`} onClick={optionHandler}>
                <div className='ManMenuButton-icon'><FontAwesomeIcon icon={icon} /></div>
                <h2>{name}</h2>
            </button>
        </div>
    )
}

export default ManMenuButton