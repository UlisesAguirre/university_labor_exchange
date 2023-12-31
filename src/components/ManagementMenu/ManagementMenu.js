import React, { useState } from 'react'
import ManMenuButton from './ManMenuButton/ManMenuButton'
import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import AddItemForm from '../Form/AddItemForm/AddItemForm'
import ItemsList from '../Lists/ItemsList/ItemsList'

import "./managementMenu.css"

const ManagementMenu = ({type, types}) => {

  const [option, setOption] = useState("");

  return (
    <div className='managementMenu-container'>
      {option === "" ? (
        <div className='managementMenu-box'>
        <div className='managementMenu-button'>
          <ManMenuButton icon={faSquarePlus} name={`Agregar ${type}`} setOption={setOption} option="add" />
          <ManMenuButton icon={faGear} name={`Editar ${types}`} setOption={setOption} option="Edit" />
        </div>
        </div>
      ) : option === "add" ? 
      <AddItemForm option={option} setOption={setOption} type={type} data="addItem"/> : 
      <ItemsList option={option} setOption={setOption} type={type} types={types}/> }
    </div>
  )
}

export default ManagementMenu