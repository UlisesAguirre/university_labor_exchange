import React from 'react'
import UserMenu from '../../components/UserMenu/UserMenu'

import "./userPage.css"
import MenuCard from '../../components/MenuCard/MenuCard'

import StudentForm from '../../components/Form/StudensForms/StudentForm'
import CompanyForm from '../../components/Form/CompaniesForms/CompanyForm'
// import CompaniesForms from '../../components/Form/CompaniesForms/CompaniesForms'



const UserPage = () => {
  return (
    <div className='userPage-container'>
        <UserMenu />
        
        {/* <MenuCard>
          <StudentForm/>
        </MenuCard>  */}
        
        
        <MenuCard>
          <CompanyForm/>
        </MenuCard>
        
    </div>
  )
}

export default UserPage