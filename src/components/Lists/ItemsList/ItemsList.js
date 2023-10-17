import React, { useContext, useState } from 'react'
import useGetRequest from "../../../custom/useGetRequest"
import Spinner from "../../Shared/Spinner/Spinner"
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'

import "./itemList.css"
import BasicButton from '../../Shared/BasicButton/BasicButton'
import useDeleteById from '../../../custom/useDeleteById'
import AddItemForm from '../../Form/AddItemForm/AddItemForm'

const ItemsList = ({ option, setOption, type, types }) => {

  const { theme } = useContext(ThemeContext);

  const [updateMode, setUpdateMode] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);

  const url = type === "carrera" ?
    "https://localhost:7049/api/Career/GetAllCareers" :
    "https://localhost:7049/api/Skill/GetAllSkills"

  const deleteUrl = type === "carrera" ?
    "" :
    "https://localhost:7049/api/Skill/DeleteSkill"

  const { deleteData, loadingDelete, errorDelete } = useDeleteById();

  const { getData, loading, error } = useGetRequest(url);


  const deleteHandler = async (id) => {
    try {
      const deleteItem = await deleteData(deleteUrl, id);
      console.log("respuesta", deleteItem);
      alert(`${type} borrada correctamente`)

    } catch (DeleteRequestError) {
      console.log("Error al actualizar datos", error);
    }

    setOption("");
  }

  const optionHandler = () => {
    setOption("")
  }

  const modeHandler = async (item) => {
    await setDataUpdate(item)
    await setUpdateMode(!updateMode);
  }

  return (
    <div>
      <h2>Editar {types}:</h2>
      {(loading || loadingDelete) && <Spinner />}
      {!updateMode ?
        <div className='itemList-container'>
          <div className={`itemList-box ${theme}`}>
            {type === "carrera" &&
              (
                getData.map((item) => (
                  <div key={item.idCarrer} className='itemsList-item'>
                    <div className='itemsList-row'>
                      <div>
                        <p className='itemsList-career-title'>Nombre: </p>
                        <p className='itemsList-career-name'>{item.name}</p>
                      </div>
                      <div>
                        <p className='itemsList-career-title'>Abreviatura: </p>
                        <p className='itemsList-career-name'>{item.abbreviation}</p>
                      </div>
                    </div>
                    <div className='itemsList-row'>
                      <div>
                        <p className='itemsList-career-title'>Tipo de carrera: </p>
                        <p className='itemsList-career-name'>{item.careerType}</p>
                      </div>
                      <div>
                        <p className='itemsList-career-title'>Cantidad de materias: </p>
                        <p className='itemsList-career-name'>{item.totalSubjets}</p>
                      </div>
                    </div>
                    <div>
                      <button className='button' onClick={() => modeHandler(item)}>Editar</button>
                      <button className='button' onClick={() => deleteHandler(item.idCarrer)}>Eliminar</button>
                    </div>
                  </div>
                ))
              )}
            {type === "habilidad" &&
              (
                getData.map((item) => (
                  <div key={item.idSkill} className='itemsList-item'>
                    <div className='itemsList-skill-item'>
                      <p className='itemsList-skill-title'>Habilidad: </p>
                      <p className='itemsList-skill-name'>{item.skillName}</p>
                    </div>
                    <div>
                      <button className='button' onClick={() => deleteHandler(item.idSkill)}>Eliminar</button>
                    </div>
                  </div>
                ))
              )}
          </div>
          <BasicButton buttonName="Volver" buttonHandler={optionHandler} />
        </div> :
        <>
          <AddItemForm option={option} setOption={setOption} type={type} data={dataUpdate} />
        </>}
    </div>
  )
}

export default ItemsList