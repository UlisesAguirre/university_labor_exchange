import React, { useState } from 'react'
import ListCard from '../ListCard/ListCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons'

const IntershipsList = ({ intership, acceptOnClick, rejectOnClick, key }) => {

  const [menuVisible, setMenuVisible] = useState(false);

  //Arreglar esto cuando se tenga la columna en la BD
  const estado = "enabled-state"

  return (
    <div>
      <ListCard menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
        <div className='title-generic-list'>
          <p>nombre</p>
          <p>Legajo:</p>
        </div>
        <div className='data-generic-list'>
          <p>Email:</p>
          <p className={estado}>Estado: Habilitado</p>
        </div>
        <div className={!menuVisible ? 'arrow-generic-list' : "arrow-generic-list-disabled"}>
          {!menuVisible ? <FontAwesomeIcon icon={faCircleUp} /> : <FontAwesomeIcon icon={faCircleDown} />}
        </div>
        {menuVisible && (
          <div className="button-generic-list">
            <p>¿Deseas cambiar el estado del alumno?</p>
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

export default IntershipsList