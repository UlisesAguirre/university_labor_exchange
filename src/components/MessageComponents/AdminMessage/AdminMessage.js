import React, { useContext } from 'react'
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'
import adminImg from "../../../assets-img/admin.png"

import "./adminMessage.css"

const AdminMessage = () => {

    const {theme} = useContext(ThemeContext);
  return (
    <div className={`adminMessage-container ${theme}`}>
        <div className="adminMessage-description">
                <p>¡Bienvenido!</p>
                <p>Utiliza el menu para administrar todo lo relacionado a la bolsa de trabajo.</p>
            </div>
            <div className='adminMessage-img'>
                <img src={adminImg} alt="" />
            </div>
    </div>
  )
}

export default AdminMessage