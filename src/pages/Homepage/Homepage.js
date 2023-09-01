import React, { useContext } from 'react'

import "./homepage.css"
import { ThemeContext } from '../../components/Context/ThemeContext/ThemeContext'

const Homepage = () => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={`homepage-container ${theme}`}>
    </div>
  )
}

export default Homepage