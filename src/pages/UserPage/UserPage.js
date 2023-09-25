import React from 'react';
import UserMenu from '../../components/UserMenu/UserMenu';
import MenuCard from '../../components/MenuCard/MenuCard';
import { Route, Routes } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';

import './userPage.css';

const UserPage = () => {
  return (
    <div className='userPage-container'>
      <UserMenu />
      <MenuCard>
        <Routes>
          <Route path='/' element={<UserCard />} />
        </Routes>
      </MenuCard>
    </div>
  );
}

export default UserPage;
