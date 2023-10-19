import React, { useEffect } from 'react'
import useGetRequest from "../../../custom/useGetRequest"
import Spinner from "../../Shared/Spinner/Spinner"

import "./managementList.css"
import StudentsList from '../StudentsList/StudentsList'
import CompaniesList from '../CompaniesList/CompaniesList'
import IntershipList from "../IntershipsList/IntershipsList"
import JobsList from "../JobsList/JobsList"

const ManagementList = ({ url, title }) => {

    const { getData, loading, error } = useGetRequest(url);

    const data = getData;

    useEffect(() => {

    }, [data]);

    console.log(getData)

    const acceptOnClick = () => {
        alert("Alumno habilitado")
    };

    const rejectOnClick = () => {
        alert("Alumno deshabilitado")
    };

    return (
        <div className='managementList-container'>
            {loading && <Spinner />}
            <p className='managementList-title'>{title}</p>

            <div className='managementList-box'>
                {title === "Alumnos" && (data.map((student) => {
                    return <StudentsList
                        student={student}
                        acceptOnClick={acceptOnClick}
                        rejectOnClick={rejectOnClick}
                        key={student.idUser} />
                }))}
                {title === "Empresas" && (data.map((company) => {
                    return <CompaniesList
                        company={company}
                        acceptOnClick={acceptOnClick}
                        rejectOnClick={rejectOnClick}
                        key={company.idUser} />
                }))}
                {title === "Relacion de dependencia" && (data.map((job) => {
                    return <JobsList
                        job={job}
                        acceptOnClick={acceptOnClick}
                        rejectOnClick={rejectOnClick}
                        key={job.idJobPosition} />
                }))}
                {title === "Pasantias" && (data.map((intership) => {
                    return <IntershipList
                        intership={intership}
                        acceptOnClick={acceptOnClick}
                        rejectOnClick={rejectOnClick}
                        key={intership.idJobPosition} />
                }))}
            </div>
        </div>
    )
}

export default ManagementList