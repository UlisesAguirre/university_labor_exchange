import React from 'react'
import iconHeader from "../../assets-img/icon-header.png"
import AuthSection from '../AuthSection/AuthSection'

import "./header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header-container">
      <div className='logo-container'>
      <Link to="/">
        <img src={iconHeader} alt="" className='img-header' />
      </Link>
      <h1>Bolsa de trabajo</h1>

      </div>
      <AuthSection />
    </div>
  )
}

export default Header