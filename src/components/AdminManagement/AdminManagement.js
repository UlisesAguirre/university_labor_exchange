import React from 'react'

import "./adminManagement.css"
import ManagementList from "../Lists/ManagementList/ManagementList"

const AdminManagement = ({ type }) => {
    return (
        <div className='adminManagement-container'>
            <h2>
                {type === "users" && "Habilitar usuarios"}
                {type === "jobPositions" && "Habilitar postulaciones"}
            </h2>
            <div>
                {type === "users" &&
                    <div className='admin-list-container'>
                        <ManagementList url="https://localhost:7049/api/Student/GetAllStudents" title="Alumnos" />
                        <ManagementList url="https://localhost:7049/api/Company/GetAllCompanies" title="Empresas" />
                    </div>
                }
                {type === "jobPositions" &&
                    <div className='admin-list-container'>
                        <ManagementList url="" title="Ofertas laborales" />
                        <ManagementList url="" title="Pasantias" />
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminManagement