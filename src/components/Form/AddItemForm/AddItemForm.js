import React, { useContext, useEffect, useState } from 'react'
import BasicButton from "../../Shared/BasicButton/BasicButton"
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'
import usePostRequest from "../../../custom/usePostRequest"
import Spinner from "../../Shared/Spinner/Spinner"

import "./addItemForm.css"
import Modal from '../../Shared/Modal/Modal'
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal'

const AddItemForm = ({ setOption, type, data }) => {

  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  const { postData, isLoading, error } = usePostRequest();

  const url = type === "carrera" ?
    "https://localhost:7049/api/Career/CreateCareer" :
    "https://localhost:7049/api/Skill/CreateSkill"

  const [dataItem, setDataItem] = useState(
    type === "carrera" ? {
      idCareer: 0,
      name: "",
      abbreviation: "",
      careerType: "",
      totalSubjets: ""
    } : {
      idSkill: 0,
      skillName: ""
    }
  );


  const regex = {
    name: /^[a-zA-Z ]{3,50}$/,
    abbreviation: /^[a-zA-Z]{1,10}$/,
    careerType: /.+/,
    totalSubjets: /^[1-9]\d{0,1}$|^50$/,
    skillName: /^[a-zA-ZáéíóúÁÉÍÓÚüÜ !@#$%^&*()-_+=,.<>;:?/'"{}[\] ]{3,50}$/
  };


  const [validInput, setValidInput] = useState(
    type === "carrera" ? {
      name: data === "addItem" ? null : regex.name.test(data.name),
      abbreviation: data === "addItem" ? null : regex.abbreviation.test(data.abbreviation),
      careerType: data === "addItem" ? null : regex.careerType.test(data.careerType),
      totalSubjets: data === "addItem" ? null : regex.totalSubjets.test(data.totalSubjets)
    } : {
      skillName: data === "addItem" ? null : regex.skillName.test(data.skillName)
    }
  );

  const errorMessage = {
    name: 'El nombre debe contener entre 3 y 50 letras.',
    abbreviation: 'La abreviatura debe contener entre 3 y 50 letras.',
    careerType: 'Debe seleccionar un tipo de carrera.',
    totalSubjets: 'La cantidad de materias debe ser un número entre 1 y 50.',
    skillName: 'El nombre de habilidad debe contener entre 3 y 50 letras.',
  };



  const handlerBlurInput = (e) => {

    const eventTarget = e.target.name;

    const updatedValidInput = {
      ...validInput,
      [eventTarget]: regex[eventTarget].test(dataItem[eventTarget])
    };

    setValidInput(updatedValidInput);

  };

  const handlerChangeInput = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value })
  };

  const submitHandler = async () => {
    setConfirmModalOpen(false)

    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: "Complete todos los campos correctamente.",
      });
    } else {
      try {
        const sendData = await postData(url, dataItem)
        setModal({
          modalOpen: true,
          modalTitle: "Aviso",
          modalMessage: "Datos actualizados correctamente.",
        });

        setTimeout(() => {
          setOption("")
        }, 2000);
      } catch (postRequestError) {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: postRequestError,
        });
      }
    }
  };

  const optionHandler = () => {
    setOption("")
  }

  const confirmSubmit = () => {
    setConfirmModalOpen(true);
  };

  useEffect(() => {
    if (data !== "addItem") {
      setDataItem(data);
    }

  }, [setDataItem, data]);


  return (
    <div className='addItem-container'>
      {isLoading && <Spinner />}
      {type === "carrera" ?
        <>
          {data === "addItem" && <h2>Agregar carrera:</h2>}
          <div>
            <form action="" className={`addItem-form ${theme}`}>
              <label >Nombre de la carrera:</label>
              <input type="text" name='name' value={dataItem.name} onChange={handlerChangeInput} onBlur={handlerBlurInput} />
              {validInput.name === false ? <div className='itemForm-error-message'>{errorMessage.name}</div> : null}

              <label >Abreviatura de la carrera:</label>
              <input type="text" name='abbreviation' value={dataItem.abbreviation} onChange={handlerChangeInput} onBlur={handlerBlurInput} />
              {validInput.abbreviation === false ? <div className='itemForm-error-message'>{errorMessage.abbreviation}</div> : null}

              <label >Tipo de carrera:</label>
              <select name='careerType' value={dataItem.careerType} onChange={(e) => setDataItem({ ...dataItem, careerType: e.target.value })} onBlur={handlerBlurInput}>
                <option value="">-- Seleccionar --</option>
                <option value="Grado">Grado</option>
                <option value="Tecnicatura">Tecnicatura</option>
                <option value="Postgrado">Posgrado</option>
                <option value="Maestria">Maestria</option>
                <option value="Especializacion">Especialización</option>
              </select>
              {validInput.careerType === false ? <div className='itemForm-error-message'>{errorMessage.careerType}</div> : null}

              <label>Cantidad de materias:</label>
              <input type="number" step="1" min="1" max="50" name="totalSubjets" id="" value={dataItem.totalSubjets} onChange={handlerChangeInput} onBlur={handlerBlurInput} />
              {validInput.totalSubjets === false ? <div className='itemForm-error-message'>{errorMessage.totalSubjets}</div> : null}

            </form>
          </div>
        </> :
        <>
          {data === "addItem" && <h2>Agregar habilidad:</h2>}
          <div>
            <form action="" className={`addItem-form ${theme}`}>
              <label>Nombre de la habilidad: </label>
              <input type="text" name='skillName' value={dataItem.skillName} onChange={handlerChangeInput} onBlur={handlerBlurInput} />
              {validInput.skillName === false && <div className='itemForm-error-message'>{errorMessage.skillName}</div>}

            </form>
          </div>
        </>}
      <BasicButton buttonName="Cancelar" buttonHandler={optionHandler} />
      <BasicButton buttonName={data === "addItem" ? "Crear" : "Editar"} buttonHandler={confirmSubmit} />

      {confirmModalOpen && (data === "addItem" ?
        <ConfirmModal
          title={`Agregar ${type}`}
          message={`¿Estás seguro de que deseas crear una nueva ${type}?`}
          onConfirm={() => submitHandler()}
          onCancel={() => setConfirmModalOpen(false)}
        /> :
        <ConfirmModal
          title={`Modificar ${type}`}
          message={`¿Estás seguro de que deseas modificar la ${type}?`}
          onConfirm={() => submitHandler()}
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
    </div>
  )
}

export default AddItemForm