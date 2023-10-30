import React from 'react'

import "./adminCard.css"
import { Route, Routes } from 'react-router-dom'
import AdminManagement from '../AdminManagement/AdminManagement'
import AdminMessage from '../MessageComponents/AdminMessage/AdminMessage'
import Error from '../Shared/Error/Error'

const AdminCard = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AdminMessage/>}/>
                <Route path='/users-management' element={<AdminManagement type="users" />}/>
                <Route path='/jobpositions-management' element={<AdminManagement type="jobPositions" />} />
                <Route path='/careers-management' element={<AdminManagement type="careers" />}/>
                <Route path='/skills-management' element={<AdminManagement type="skills" />}/>
                <Route path='/*' element={<Error error={'404'}/>}/>
            </Routes>
        </>
    )
}

export default AdminCard