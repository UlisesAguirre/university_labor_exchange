import React from 'react'

import "./adminManagement.css"
import ManagementList from "../Lists/ManagementList/ManagementList"
import ManagementMenu from '../ManagementMenu/ManagementMenu'
import JobsManMenu from '../ManagementMenu/JobsManMenu/JobsManMenu'

const AdminManagement = ({ type }) => {
    return (
        <div className='adminManagement-container'>
            <h2>
                {type === "users" && "Habilitar usuarios"}
                {type === "jobPositions" && "Habilitar ofertas laborales"}
            </h2>
            <div>
                {type === "users" &&
                    <div className='admin-list-container'>
                        <ManagementList url="https://localhost:7049/api/Student/GetStudentsToAdmin" title="Alumnos" />
                        <ManagementList url="https://localhost:7049/api/Company/GetCompaniesToAdmin" title="Empresas" />
                    </div>
                }
                {type === "jobPositions" &&
                    <JobsManMenu />
                }
            </div>
            {type === "careers" &&
                <ManagementMenu type="carrera" types="carreras" />
            }
            {type === "skills" &&
                <ManagementMenu type="habilidad" types="habilidades" />
            }
        </div>
    )
}

export default AdminManagement