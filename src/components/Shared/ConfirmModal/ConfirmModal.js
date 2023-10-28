import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

import "./confirmModal.css"

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="custom-modal-overlay">
      <div className={`custom-modal ${theme}`}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="button-modal-container">
          <button onClick={onConfirm} className="button">
            Confirmar
          </button>
          <button onClick={onCancel} className="button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;