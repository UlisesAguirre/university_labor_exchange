import React, { useContext } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../Context/ThemeContext/ThemeContext";
import "./themeButton.css";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="themeButton-container">
      <button
        onClick={toggleTheme}
        className={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? (
          <FontAwesomeIcon icon={faMoon} />
          ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </button>
      <p>{theme === "light" ? "Modo oscuro" : "Modo claro"}</p>
    </div>
  );
};

export default ThemeButton;