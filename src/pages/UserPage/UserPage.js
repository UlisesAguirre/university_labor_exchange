import React, { useContext } from 'react';
import UserMenu from '../../components/UserMenu/UserMenu';
import MenuCard from '../../components/MenuCard/MenuCard';
import { Route, Routes } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import StudentForm from '../../components/Form/StudensForms/StudentForm'
import CompanyForm from '../../components/Form/CompaniesForms/CompanyForm'
import JobOffer from '../../components/Form/CompaniesForms/JobOffer/JobOffer'
// import CompaniesForms from '../../components/Form/CompaniesForms/CompaniesForms'

import './userPage.css';
import UserContext from '../../components/Context/UserContext/UserContext';

const UserPage = () => {

  const { user } = useContext(UserContext);

  return (
    <div className='userPage-container'>
      <UserMenu />
      <MenuCard>
        <Routes>
          <Route path='/' element={<UserCard />} />
          {user.userType === "student" && <Route path='/editprofile' element={<StudentForm />} /> }
          {user.userType === "company" &&
          <>
          <Route path='/editprofile' element={<CompanyForm />} /> 
          <Route path='/addoffer' element={<JobOffer/>}/>
          </>
           }
        </Routes>
      </MenuCard>

    </div>
  );
}

export default UserPage;
