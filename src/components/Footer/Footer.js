import React from 'react'

import "./footer.css"
import ThemeButton from '../ThemeButton/ThemeButton'

const Footer = () => {
  return (
    <div className='footer-container'>
      <ThemeButton/>
      <p>Derechos reservados &copy; PPS</p>
      <button style={{opacity: 0}}>Aca va el chatbot</button>
    </div>
  )
}

export default Footer