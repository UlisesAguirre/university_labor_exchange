import { useState } from 'react';
import ManagementList from '../Lists/ManagementList/ManagementList'
import JobPositionsList from '../Lists/JobPositionsList/JobPositionsList';
import useGetRequest from '../../custom/useGetRequest';
import Spinner from '../Shared/Spinner/Spinner';
import Error from '../Shared/Error/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import "./jobPositionMenu.css"
import JobPositionCard from '../Shared/JobPositionCard/JobPositionCard';

const JobPositionMenu = ({ title, url, setOption }) => {

    const [forceUpdate, setForceUpdate] = useState(false)

    const { getData, loading, error } = useGetRequest(url, forceUpdate)

    const data = getData;

    const [menuVisible, setMenuVisible] = useState(false);
    const [targetJob, setTargetJob] = useState();

    const optionHandler = () => {
        setOption("")
    }

    const forcedUpdate = () => {
        setForceUpdate(!forceUpdate);
    }

    return (
        <>
            {error ?
                <Error error={error} />
                :
                <>

                    <div className='jobPositionMenu-container'>
                        {(title !== "Ofertas laborales disponibles" && title !== "Ofertas laborales") ?
                            <ManagementList url={url} title={title} /> :
                            <div className='jobPositionMenu-box'>
                                {loading && <Spinner />}
                                <h2>{title}</h2>
                                <div className='jobPositionMenu-list'>
                                    {!menuVisible ? (
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
                                    ) : (
                                        <JobPositionCard jobPosition={targetJob}
                                            menuVisible={menuVisible}
                                            setMenuVisible={setMenuVisible}
                                            forcedUpdate={forcedUpdate} />
                                    )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    {(title !== "Ofertas laborales disponibles") &&
                        <button onClick={optionHandler} className='button'>
                            <FontAwesomeIcon icon={faRightFromBracket} className="job-position-icon" /> Menu
                        </button>}
                </>
            }
        </>
    )
}

export default JobPositionMenu