import React from 'react'

import "./adminCard.css"
import { Route, Routes } from 'react-router-dom'
import AdminManagement from '../AdminManagement/AdminManagement'

const AdminCard = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element="Hola"/>
                <Route path='/users-management' element={<AdminManagement type="users" />}/>
                <Route path='/jobpositions-management' element={<AdminManagement type="jobPositions" />} />
                <Route path='/careers-management' element="Adios"/>
                <Route path='/skills-management' element="Adios"/>
            </Routes>
        </div>
    )
}

export default AdminCard