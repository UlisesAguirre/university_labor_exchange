import React, { useContext, useState } from 'react'
import useGetRequest from "../../../custom/useGetRequest"
import Spinner from "../../Shared/Spinner/Spinner"
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'

import "./itemList.css"
import BasicButton from '../../Shared/BasicButton/BasicButton'
import useDeleteById from '../../../custom/useDeleteById'
import AddItemForm from '../../Form/AddItemForm/AddItemForm'
import Modal from '../../Shared/Modal/Modal'
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal'
import Error from '../../Shared/Error/Error'

const ItemsList = ({ option, setOption, type, types }) => {

  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [itemTarget, setItemTarget] = useState("");

  const { theme } = useContext(ThemeContext);

  const [updateMode, setUpdateMode] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);

  const url = type === "carrera" ?
    "https://university-labor-exchange.azurewebsites.net/api/Career/GetCareersForForms" :
    "https://university-labor-exchange.azurewebsites.net/api/Skill/GetSkillsForForm"

  const deleteUrl = type === "carrera" ?
    "https://university-labor-exchange.azurewebsites.net/api/Career/DeleteCareer" :
    "https://university-labor-exchange.azurewebsites.net/api/Skill/DeleteSkill"

  const { deleteData, loadingDelete} = useDeleteById();

  const { getData, loading, error } = useGetRequest(url);


  const deleteHandler = async () => {
    setConfirmModalOpen(false)
    try {
      const deleteItem = await deleteData(deleteUrl, itemTarget);
      setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage: `${type} borrada correctamente`,
      });

    } catch (DeleteRequestError) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: DeleteRequestError,
      });
    }

    setTimeout(() => {
      setOption("");
    }, 2000);
  }

  const optionHandler = () => {
    setOption("")
  }

  const modeHandler = async (item) => {
    await setDataUpdate(item)
    await setUpdateMode(!updateMode);
  }

  const deleteConfirm = (item) => {
    setItemTarget(item)
    setConfirmModalOpen(true)
  }

  return (
    <div className='itemsList-container'>
      {error ?
        <Error error={error} />
        :
        <>
          <h2 className='itemsList-title'>Editar {types}:</h2>
          {(loading || loadingDelete) && <Spinner />}
          {!updateMode ?
            <div className='itemList-container'>
              <div className={`itemList-box ${theme}`}>
                {type === "carrera" &&
                  (
                    getData.map((item) => (
                      <div key={item.idCareer} className='itemsList-item'>
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
                          <button className='button' onClick={() => deleteConfirm(item.idCareer)}>Eliminar</button>
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
                          <button className='button' onClick={() => modeHandler(item)}>Editar</button>
                          <button className='button' onClick={() => deleteConfirm(item.idSkill)}>Eliminar</button>
                        </div>
                      </div>
                    ))
                  )}
              </div>
              <BasicButton buttonName="Volver" buttonHandler={optionHandler} />
            </div> :
            <>
              {type === "carrera" ?
                <AddItemForm option={option} setOption={setOption} type={type} data={dataUpdate} /> :
                <AddItemForm option={option} setOption={setOption} type={type} data={dataUpdate} />}
            </>}

          {confirmModalOpen && (
            <ConfirmModal
              title="Eliminar"
              message="¿Estás seguro de que deseas eliminarlo de la lista?"
              onConfirm={() => deleteHandler()}
              onCancel={() => setConfirmModalOpen(false)}
            />
          )}

          {modal.modalOpen && (
            <Modal
              title={modal.modalTitle}
              message={modal.modalMessage}
              onClose={() => setModal({ modalOpen: false })}
            />
          )}
        </>
      }

    </div>
  )
}

export default ItemsList