import { faList, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import AddJobOffer from '../Form/CompaniesForms/JobOffer/AddJobOffer';
import ManMenuButton from '../ManagementMenu/ManMenuButton/ManMenuButton';
import JobsManMenu from '../ManagementMenu/JobsManMenu/JobsManMenu';
import "./companyJobOffer.css"
import BasicButton from '../Shared/BasicButton/BasicButton';

const CompanyJobOffer = () => {
    const [option, setOption] = useState('');

    const goBackToMenu = (e) => {
        setOption('')
    }

    const button = (
        <div>
            <BasicButton buttonName={'Volver al menú'} buttonHandler={goBackToMenu} />
        </div>
    )
    
    return (
        <div className='companyJobOffer-container'>

            {option == '' ?
                (
                    <div className='companyJobOffer-box'>
                        <h2>Ofertas Laborales</h2>
                        <div className='companyJobOffer-button'>
                            <ManMenuButton icon={faSquarePlus} name={'Agregar Oferta laboral'} setOption={setOption} option="add" />
                            <ManMenuButton icon={faList} name={'Ver ofertas laborales'} setOption={setOption} option="look" />
                        </div>
                    </div>
                )
                :
                (option == 'add' ?
                    (
                        <>
                            <AddJobOffer setOption={setOption} />
                        </>
                    )
                    :
                    (
                        <div className='companyJobOffer-box'>
                            <h2>Ver ofertas laborales</h2>
                            <JobsManMenu/>
                            {button}
                        </div>
                    )
                )
            }
        </div>
    )
}


export default CompanyJobOffer
