import React from 'react'

import "./menuCard.css"

const MenuCard = ({children}) => {
  return (
    <div className='menuCard-container'>
      {children}
    </div>
  )
}

export default MenuCard