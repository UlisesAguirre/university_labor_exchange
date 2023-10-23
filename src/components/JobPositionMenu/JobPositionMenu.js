import { useState } from 'react';
import ManagementList from '../Lists/ManagementList/ManagementList'
import JobPositionsList from '../Lists/JobPositionsList/JobPositionsList';
import useGetRequest from '../../custom/useGetRequest';
import Spinner from '../Shared/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import "./jobPositionMenu.css"
import JobPositionCard from '../Shared/JobPositionCard/JobPositionCard';

const JobPositionMenu = ({ title, url, setOption }) => {

    //Dejo aca las cosas que deberias mandar al instanciar el JobPositionMenu:
    //title = "Ofertas laborales" (con el titulo diferenciamos que vamos a renderizar.Ese es para las empresas)
    //url = tenes que mandar la url para traerte todos los trabajos, hay un service que trae todo, tendrias que crear
    //un endpoint para utilizar ese metodo (a menos que el profe diga de hacer la superconsultasql)
    //setOption = Aca mandas el setState que setearias con el boton, para volver a renderizar el menu anterior
    //Para que funcione, tenes que renderizar el menu anterior con un ternario, cuando el state sea "" 

    //Yo calculo que el boton lo vas a usar para volver al menu donde aparece "Agregar oferta" y "ver ofertas"
    //El alumno no tiene menu previo, por eso no lo renderizaria

    //Con setMenuVisible, manejas el mostrar las ofertas laborales completas

    //Dejo una lista de los title por si te sirve a entender mejor: 
    //Pasantias y Relacion de dependencia = Admin
    //Ofertas laborales = Empresa
    //Ofertas laborales disponibles = Alumnos

    
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
            {(title !== "Ofertas laborales disponibles" && title !== "Ofertas laborales") &&
                <button onClick={optionHandler} className='button'>
                    <FontAwesomeIcon icon={faRightFromBracket} className="job-position-icon" /> Menu
                </button>}
        </>
    )
}

export default JobPositionMenu