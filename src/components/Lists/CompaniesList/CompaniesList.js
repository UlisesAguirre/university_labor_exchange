import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons'
import ListCard from "../ListCard/ListCard"


const CompaniesList = ({ company, stateOnClick}) => {

  const [menuVisible, setMenuVisible] = useState(false);


  return (
    <div className='generic-list-container'>
      <ListCard menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
        <div className='title-generic-list'>
          <p>{company.socialReason}</p>
          <p>Cuit: {company.cuit}</p>
        </div>
        <div className='data-generic-list'>
          <p>Email: {company.email}</p>
          {company.state === 0 ? <p className="enabled-state">Estado: Habilitado</p> :
            company.state === 1 ? <p className="disabled-state">Estado: Deshabilitado</p> :
              <p className="unassigned-state">Estado: Sin asignar</p>}
        </div>
        <div className={!menuVisible ? 'arrow-generic-list' : "arrow-generic-list-disabled"}>
          {!menuVisible ? <FontAwesomeIcon icon={faCircleUp} /> : <FontAwesomeIcon icon={faCircleDown} />}
        </div>
        {menuVisible && (
          <div className="button-generic-list">
            <p>¿Deseas cambiar el estado de la empresa?</p>
            <div className='button-generic-box'>
              <button className='button' onClick={() => stateOnClick("Empresa habilitada", 0, company.idUser)}>
                Habilitar
              </button>
              <button className='button' onClick={() => stateOnClick("Empresa deshabilitada", 1, company.idUser)}>
                Deshabilitar
              </button>
            </div>
          </div>
        )}
      </ListCard>
    </div>
  )
}

export default CompaniesList