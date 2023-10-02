import React, { useState } from 'react'
import CompanyData from './CompanyData';
import ContactData from './ContactData';
import BasicButton from '../../Shared/BasicButton/BasicButton';

// Datos de la empresa: CompanyName, Cuit, TelephoneNumber, Sector, LegalAdress, PostalCode, Web, Location, SocialReason

// Datos de contacto: RecruiterName, RecruiterLastName, RecruiterPosition, RecruiterPhoneNumber, RecruiterEmail, RecruiterRelWithCompany

const CompanyForm = () => {
    
    const inicialForm = {
        companyName: '',
        cuit: '',
        telephoneNumber: '',
        sector:'',
        legalAddress: '',
        postalCode: '',
        web: '',
        location: '',
        socialReason: '',
        recruiterName: '',
        recruiterLastName: '', 
        recruiterPosition:'', 
        recruiterPhoneNumber:'', 
        recruiterEmail: '', 
        recruiterRelWithCompany: ''
    }
   
    const [form, setForm] = useState(inicialForm);

    const [step, setStep] = useState(1);

    const stepForwardHandler = (data) => {
        setForm({ ...form, ...data });
        setStep(step => step + 1);
    };

    const stepBackHandler = () => {
        setStep(step => step - 1);
    };

    return (

        <div>
            <form>

                {step === 1 && <CompanyData stepForwardHandler={stepForwardHandler} form={form} setForm={setForm}/>}
                {step === 2 && <ContactData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} />}

            </form>

            <div>
                {step === 4 ? <BasicButton buttonName={'Guardar'} /> : null}
            </div>

        </div>
    )
}

export default CompanyForm
