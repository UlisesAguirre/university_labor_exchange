import React from 'react'

import "./fullForm.css"
import { useNavigate } from 'react-router-dom';

const FullForm = ({ title, nameButton, typeForm }) => {

    const navigate = useNavigate();

    const submitHandler=() => {  
        navigate("/login");
    };

    return (
        <div className='fullForm-container'>
            <p className='title-form'>{title}</p>
            <form action="" className='fullForm-box'>
                <div>
                    {typeForm === "Soy alumno" ?
                        <>
                            <label htmlFor="">Nombre:</label>
                            <input type="text" />
                            <label htmlFor="">Apellido:</label>
                            <input type="text" />
                            <label htmlFor="">Legajo:</label>
                            <input type="text" />
                        </> :
                        <>
                            <label htmlFor="">CUIT:</label>
                            <input type="text" />
                            <label htmlFor="">Razon social:</label>
                            <input type="text" />
                        </>}

                    <label htmlFor="">Email personal:</label>
                    <input type="email" name="" id="" />
                </div>
                <div>
                    <label htmlFor="">Email universitario: *</label>
                    <input type="email" name="" id="" />
                    <label htmlFor="">Contraseña:</label>
                    <input type='password' />
                    <label htmlFor="">Repetir contraseña:</label>
                    <input type='password' />
                </div>
            </form>
            <button className='button' onClick={submitHandler}>{nameButton}</button>
        </div>
    )
}

export default FullForm