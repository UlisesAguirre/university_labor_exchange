import React from 'react'
import iconHeader from "../../assets-img/icon-header.png"
import AuthSection from '../AuthSection/AuthSection'

import "./header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header-container">
      <div className='logo-container'>
        <Link to="/" className='header-logo'>
          <img src={iconHeader} alt="" className='img-header' />
          <h1>Bolsa de trabajo</h1>
        </Link>
      </div>
      <AuthSection />
    </div>
  )
}

export default Header