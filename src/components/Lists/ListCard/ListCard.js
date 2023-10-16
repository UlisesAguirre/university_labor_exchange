import React, { useContext} from 'react'
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext'

import "./listCard.css"

const ListCard = ({ children, menuVisible ,setMenuVisible }) => {

    const {theme} = useContext(ThemeContext);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

    return (
        <div className={`listCard-container ${theme}`} onClick={toggleMenu}>
            {children}
        </div>
    )
}

export default ListCard