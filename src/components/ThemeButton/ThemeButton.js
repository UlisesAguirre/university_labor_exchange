import React, { useContext } from "react";
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
          <p>oscuro</p>
        ) : (
          <p>claro</p>
        )}
      </button>
    </div>
  );
};

export default ThemeButton;