import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "./modal.css";

const Modal = ({ title, message, onClose }) => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="modal-overlay">
            <div className={`modal-container ${theme}`}>
                <div className="header-modal">
                    <h3 className="modal-title">{title}</h3>
                </div>
                <div className="content-modal">
                    <p className="modal-message">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;