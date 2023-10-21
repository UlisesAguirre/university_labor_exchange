import useGetRequest from "../../../custom/useGetRequest"
import Spinner from "../../Shared/Spinner/Spinner"

import "./managementList.css"
import StudentsList from '../StudentsList/StudentsList'
import CompaniesList from '../CompaniesList/CompaniesList'
import usePutRequest from '../../../custom/usePutRequest'
import { useState } from "react"
import JobPositionsList from "../JobPositionsList/JobPositionsList"
import JobPositionCard from "../../Shared/JobPositionCard/JobPositionCard"

const ManagementList = ({ url, title }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [targetJob, setTargetJob] = useState();

    const [forceUpdate, setForceUpdate] = useState(false)

    const { getData, loading, error } = useGetRequest(url, forceUpdate);

    const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();

    const data = getData;

    const stateOnClick = async (type, state, idUser) => {
        const data = {
            idUser: idUser,
            state: state
        }

        try {
            await sendPutRequest("https://localhost:7049/api/Student/SetUserState", JSON.stringify(data), 'application/json');
            alert(type);

            setForceUpdate(!forceUpdate);
        } catch (putRequestError) {
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
                {!menuVisible ? (
                    (title === "Relacion de dependencia" || title === "Pasantias") && (
                        data.map((jobPosition) => (
                            <JobPositionsList
                                jobPosition={jobPosition}
                                menuVisible={menuVisible}
                                setMenuVisible={setMenuVisible}
                                setTargetJob={setTargetJob}
                                title={title}
                                key={jobPosition.idJobPosition}
                            />
                        ))
                    ) 
                ) : <JobPositionCard jobPosition={targetJob}/>}
            </div>
        </div>
    )
}

export default ManagementList