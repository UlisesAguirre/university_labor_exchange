import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import "./basicInput.css";

const BasicInput = ({
  inputName,
  placeholder,
  type,
  name,
  event,
  onBlur,
  validInput,
  errorMessage,
  position
}) => {

  const errorStyle = {
    position: "absolute",
    [position]: "100%",
  };

  return (
    <div className="basicInput-container">
      <label>{inputName}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={event}
        onBlur={onBlur}
        className="inputComponent"
      ></input>
      {validInput[name] === false ? (
        <div className="container-span" style={errorStyle}>
          <span className="span-input">
            {name !== "password" ? <FontAwesomeIcon icon={faTriangleExclamation} className="input-icon" /> : null}
            {errorMessage}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BasicInput; 