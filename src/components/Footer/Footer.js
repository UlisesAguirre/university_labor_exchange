import React from 'react'

import "./footer.css"
import ThemeButton from '../ThemeButton/ThemeButton'
import Chat from '../Chat/Chat'
import { Link } from 'react-router-dom'



const Footer = () => {

  return (
    <div className='footer-container'>
      <ThemeButton/>
      <p>Derechos reservados &copy; PPS</p>
      {/* <div className='chat'><Chat/></div> */}
    </div>
  )
}

export default Footer