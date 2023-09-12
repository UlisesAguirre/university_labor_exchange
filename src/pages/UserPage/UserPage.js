import React from 'react'
import UserMenu from '../../components/UserMenu/UserMenu'

import "./userPage.css"
import MenuCard from '../../components/MenuCard/MenuCard'

const UserPage = () => {
  return (
    <div className='userPage-container'>
        <UserMenu />
        <MenuCard />
    </div>
  )
}

export default UserPage