import { useContext} from "react"
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext"

const JobPositionsList = ({ jobPosition, setMenuVisible, menuVisible, setTargetJob, title }) => {

  //Aca podes usar el title para condicionar lo que vas a renderizar y lo que no en el item de la lista

  const { theme } = useContext(ThemeContext);

  const viewJobOnClick = () => {
    setMenuVisible(!menuVisible);
    setTargetJob(jobPosition)
  }

  console.log(jobPosition)

  return (
    <div className='generic-list-container'>
      <div className={`listCard-container ${theme}`} onClick={viewJobOnClick} >
        <div className='title-generic-list'>
          <p>Titulo: {jobPosition.jobTitle}</p>
          <p>Creador: {jobPosition.idCompany}</p> {/*No traje el nombre de la empresa en el endpoint D:<*/}
        </div>
        <div className='data-generic-list'>
          <p>Puesto: {jobPosition.positionToCover}</p>
          {(title === "Pasantias" || title === "Relacion de dependencia") && (
            jobPosition.state === 0 ? <p className="enabled-state">Estado: Habilitado</p> :
              jobPosition.state === 1 ? <p className="disabled-state">Estado: Deshabilitado</p> :
                <p className="unassigned-state">Estado: Sin asignar</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobPositionsList