import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons'
import ListCard from "../ListCard/ListCard"


const CompaniesList = ({ company, acceptOnClick, rejectOnClick }) => {

  const [menuVisible, setMenuVisible] = useState(false);

  //Arreglar esto cuando se tenga la columna en la BD
  const estado = "enabled-state"

  return (
    <div className='generic-list-container'>
      <ListCard menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
          <div className='title-generic-list'>
                    <p>{company.socialReason}</p>
                    <p>Cuit: {company.cuit}</p>
                </div>
                <div className='data-generic-list'>
                    <p>Email: {company.email}</p>
                    <p className={estado}>Estado: Habilitado</p>
                </div>
                <div className={!menuVisible ? 'arrow-generic-list' : "arrow-generic-list-disabled"}>
                    {!menuVisible ? <FontAwesomeIcon icon={faCircleUp} /> : <FontAwesomeIcon icon={faCircleDown} />}
                </div>
                {menuVisible && (
                    <div className="button-generic-list">
                        <p>¿Deseas cambiar el estado de la empresa?</p>
                        <div className='button-generic-box'>
                            <button className='button' onClick={acceptOnClick}>Habilitar</button>
                            <button className='button' onClick={rejectOnClick}>Deshabilitar</button>
                        </div>
                    </div>
                )}
      </ListCard>
    </div>
  )
}

export default CompaniesList