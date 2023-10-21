import React, { useState } from 'react'
import ManMenuButton from '../ManMenuButton/ManMenuButton'
import { faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons'

import "../managementMenu.css"
import JobPositionMenu from '../../JobPositionMenu/JobPositionMenu'

const JobsManMenu = () => {

  const [option, setOption] = useState("");


  return (
    <div className='managementMenu-container'>
      {option === "" ? (
        <div className='managementMenu-box'>
          <div className='managementMenu-button'>
            <ManMenuButton icon={faSchool} name="Pasantias" setOption={setOption} option="interships" />
            <ManMenuButton icon={faBriefcase} name="Trabajos" setOption={setOption} option="jobs" />
          </div>
        </div>
      ) : option === "interships" ?
          <JobPositionMenu url="https://localhost:7049/api/JobPosition/GetAllInterships" title="Pasantias" setOption={setOption}/> :
          <JobPositionMenu url="https://localhost:7049/api/JobPosition/GetAllJobs" title="Relacion de dependencia" setOption={setOption}/> }
    </div>
  )
}

export default JobsManMenu