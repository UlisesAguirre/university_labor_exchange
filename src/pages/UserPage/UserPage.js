import React from 'react'
import UserMenu from '../../components/UserMenu/UserMenu'

import "./userPage.css"
import MenuCard from '../../components/MenuCard/MenuCard'

import StudentForm from '../../components/Form/StudensForms/StudentForm'



const UserPage = () => {
  return (
    <div className='userPage-container'>
        <UserMenu />
        
        <MenuCard>
          <StudentForm/>
        </MenuCard>
        
    </div>
  )
}

export default UserPage