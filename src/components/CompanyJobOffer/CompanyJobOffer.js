import { faList, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import AddJobOffer from '../Form/CompaniesForms/JobOffer/AddJobOffer';
import "./companyJobOffer.css"
import ManMenuButton from '../ManagementMenu/ManMenuButton/ManMenuButton';

const CompanyJobOffer = () => {
    const [option, setOption] = useState('');

    return (
        <div className='companyJobOffer-container'>
            {option == '' ?
                (<div className='companyJobOffer-box'>
                    <h2>Ofertas Laborales</h2>
                    <div className='companyJobOffer-button'>
                        <ManMenuButton icon={faSquarePlus} name={'Agregar Oferta laboral'} setOption={setOption} option="add" />
                        <ManMenuButton icon={faList} name={'Ver ofertas laborales'} setOption={setOption} option="look" />
                    </div>
                </div>)
                : option == 'add' ?
                    <AddJobOffer />
                :
                <div>{/* ver ofertas laborales */}</div>
            }         
        </div>
    )
}


export default CompanyJobOffer
