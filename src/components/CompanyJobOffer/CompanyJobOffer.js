import { faList, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import AddJobOffer from '../Form/CompaniesForms/JobOffer/AddJobOffer';
import ManMenuButton from '../ManagementMenu/ManMenuButton/ManMenuButton';
import "./companyJobOffer.css"
import JobPositionMenu from '../JobPositionMenu/JobPositionMenu';

const CompanyJobOffer = () => {
    const [option, setOption] = useState('');
    
    return (
        <div className='companyJobOffer-container'>

            {option === '' ?
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
                (option === 'add' ?
                    (
                        <>
                            <AddJobOffer setOption={setOption} />
                        </>
                    )
                    :
                    (
                        <div className='companyJobOffer-box'>
                            <JobPositionMenu title={"Ofertas laborales"} url={'https://university-labor-exchange.azurewebsites.net/api/Company/GetCompanyJobPositionsInfo'} setOption={setOption}/>
                        </div>
                    )
                )
            }
        </div>
    )
}


export default CompanyJobOffer
