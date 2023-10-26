import React, { useContext } from 'react';
import UserMenu from '../../components/UserMenu/UserMenu';
import MenuCard from '../../components/MenuCard/MenuCard';
import { Route, Routes } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import StudentForm from '../../components/Form/StudensForms/StudentForm'
import CompanyForm from '../../components/Form/CompaniesForms/CompanyForm'
// import CompaniesForms from '../../components/Form/CompaniesForms/CompaniesForms'

import './userPage.css';
import UserContext from '../../components/Context/UserContext/UserContext';
import AdminCard from '../../components/AdminCard/AdminCard';
import CompanyJobOffer from '../../components/CompanyJobOffer/CompanyJobOffer';
import JobPositionMenu from '../../components/JobPositionMenu/JobPositionMenu';
import DisabledMessage from '../../components/MessageComponents/DisabledMessage/DisabledMessage';
import UnasignedMessage from "../../components/MessageComponents/UnasignedMessage/UnasignedMessage";

const UserPage = () => {

  const { user } = useContext(UserContext);

  return (
    <div className='userPage-container'>
      <UserMenu />
      <MenuCard>
        {user.state === "SinAsignar" ? <UnasignedMessage/> : user.state === "Deshabilitado" ? <DisabledMessage />:
          <>
            <Routes>
              {user.userType === "admin" ?
                <>
                  <Route path='/*' element={<AdminCard />} />
                </> :
                <>
                  <Route path='/' element={<UserCard />} />
                  {user.userType === "student" &&
                    <>
                      <Route path='/editprofile' element={<StudentForm />} />
                      <Route path='/view-offers' element={<JobPositionMenu title="Ofertas laborales disponibles" url="https://localhost:7049/api/JobPosition/GetJobPositions" />} />
                    </>
                  }
                  {user.userType === "company" &&
                    <>
                      <Route path='/editprofile' element={<CompanyForm />} />
                      <Route path='/add-offer' element={<CompanyJobOffer />} />
                    </>
                  }
                </>
              }

            </Routes>
          </>}
      </MenuCard>
    </div>
  );
}

export default UserPage;
