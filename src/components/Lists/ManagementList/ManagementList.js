import useGetRequest from "../../../custom/useGetRequest"
import Spinner from "../../Shared/Spinner/Spinner"

import "./managementList.css"
import StudentsList from '../StudentsList/StudentsList'
import CompaniesList from '../CompaniesList/CompaniesList'
import IntershipList from "../IntershipsList/IntershipsList"
import JobsList from "../JobsList/JobsList"
import usePutRequest from '../../../custom/usePutRequest'
import { useState } from "react"

const ManagementList = ({ url, title }) => {
    const [forceUpdate, setForceUpdate] = useState(false)

    const { getData, loading, error } = useGetRequest(url, forceUpdate);

    const {sendPutRequest, loadingPutRequest, putRequestError} = usePutRequest();

    const data = getData;

        const stateOnClick =  async (type, state, idUser ) => {
            const data = {
                idUser: idUser,
                state: state
            }

            try {
                await sendPutRequest("https://localhost:7049/api/Student/SetUserState", JSON.stringify(data), 'application/json');
                alert(type);

                setForceUpdate(!forceUpdate);
            }catch(putRequestError) {
                console.log("Error: ", putRequestError)
            }

        };

    return (
        <div className='managementList-container'>
            {(loading || loadingPutRequest) && <Spinner />}
            
            <p className='managementList-title'>{title}</p>

            <div className='managementList-box'>
                {title === "Alumnos" && (data.map((student) => {
                    return <StudentsList
                        student={student}
                        stateOnClick={stateOnClick}
                        key={student.idUser} />
                }))}
                {title === "Empresas" && (data.map((company) => {
                    return <CompaniesList
                        company={company}
                        stateOnClick={stateOnClick}
                        key={company.idUser} />
                }))}
                {title === "Relacion de dependencia" && (data.map((job) => {
                    return <JobsList
                        job={job}
                        stateOnClick={stateOnClick}
                        key={job.idJobPosition} />
                }))}
                {title === "Pasantias" && (data.map((intership) => {
                    return <IntershipList
                        intership={intership}
                        stateOnClick={stateOnClick}
                        key={intership.idJobPosition} />
                }))}
            </div>
        </div>
    )
}

export default ManagementList