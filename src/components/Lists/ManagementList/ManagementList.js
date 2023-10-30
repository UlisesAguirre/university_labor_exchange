import useGetRequest from "../../../custom/useGetRequest"
import Spinner from "../../Shared/Spinner/Spinner"
import Error from "../../Shared/Error/Error"

import "./managementList.css"
import StudentsList from '../StudentsList/StudentsList'
import CompaniesList from '../CompaniesList/CompaniesList'
import usePutRequest from '../../../custom/usePutRequest'
import { useState } from "react"
import JobPositionsList from "../JobPositionsList/JobPositionsList"
import JobPositionCard from "../../Shared/JobPositionCard/JobPositionCard"
import Modal from "../../Shared/Modal/Modal"

const ManagementList = ({ url, title }) => {

    const [modal, setModal] = useState({
        modalOpen: false,
        modalTitle: "",
        modalMessage: "",
    });


    const [menuVisible, setMenuVisible] = useState(false);
    const [targetJob, setTargetJob] = useState();

    const [forceUpdate, setForceUpdate] = useState(false)

    const { getData, loading, error } = useGetRequest(url, forceUpdate);

    const { sendPutRequest, loadingPutRequest } = usePutRequest();

    const data = getData;

    const stateOnClick = async (type, state, idUser) => {
        const data = {
            idUser: idUser,
            state: state
        }

        try {
            await sendPutRequest("https://university-labor-exchange.azurewebsites.net/api/Student/SetUserState", JSON.stringify(data), 'application/json');
            setModal({
                modalOpen: true,
                modalTitle: "Aviso",
                modalMessage: type,
            });

            setTimeout(() => {
                setForceUpdate(!forceUpdate);
            }, 2000);

        } catch (putRequestError) {
            setModal({
                modalOpen: true,
                modalTitle: "Error",
                modalMessage: "Error al modificar usuario",
            });
        }

    };
    const forcedUpdate = () => {
        setForceUpdate(!forceUpdate);
    }

    return (
        <>
            {error ?
                <Error error={error} />
                :
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
                        ) : <JobPositionCard jobPosition={targetJob}
                            menuVisible={menuVisible}
                            setMenuVisible={setMenuVisible}
                            forcedUpdate={forcedUpdate} />
                        }
                    </div>

                    {modal.modalOpen && (
                        <Modal
                            title={modal.modalTitle}
                            message={modal.modalMessage}
                            onClose={() => setModal({ modalOpen: false })}
                        />
                    )}
                </div>
            }

        </>
    )
}

export default ManagementList