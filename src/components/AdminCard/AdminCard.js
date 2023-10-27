import React from 'react'

import "./adminCard.css"
import { Route, Routes } from 'react-router-dom'
import AdminManagement from '../AdminManagement/AdminManagement'
import AdminMessage from '../MessageComponents/AdminMessage/AdminMessage'

const AdminCard = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AdminMessage/>}/>
                <Route path='/users-management' element={<AdminManagement type="users" />}/>
                <Route path='/jobpositions-management' element={<AdminManagement type="jobPositions" />} />
                <Route path='/careers-management' element={<AdminManagement type="careers" />}/>
                <Route path='/skills-management' element={<AdminManagement type="skills" />}/>
            </Routes>
        </>
    )
}

export default AdminCard