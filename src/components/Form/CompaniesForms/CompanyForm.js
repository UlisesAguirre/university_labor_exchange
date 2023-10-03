import { useContext, useEffect, useState } from 'react'
import CompanyData from './CompanyData';
import ContactData from './ContactData';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import useGetBySomething from '../../../custom/UseGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';

    // const inicialForm = {
    //     companyName: '',
    //     cuit: '',
    //     telephoneNumber: '',
    //     sector:'',
    //     legalAddress: '',
    //     postalCode: '',
    //     web: '',
    //     location: '',
    //     socialReason: '',
    //     recruiterName: '',
    //     recruiterLastName: '', 
    //     recruiterPosition:'', 
    //     recruiterPhoneNumber:'', 
    //     recruiterEmail: '', 
    //     recruiterRelWithCompany: ''
    // }

const CompanyForm = () => {


    const { user } = useContext(UserContext);

    const url = 'https://localhost:7049/api/Company/GetCompany';

    const {data, loading, error } = useGetBySomething(url, user.id);

    const {sendPutRequest, loadingPutRequest, putRequestError} = usePutRequest();

    const [form, setForm] = useState('');
    
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    },[data]);

    const stepForwardHandler = (data) => {
        setForm({ ...form, ...data });
        if(step === 2 ){
            console.log("Hola")
            submitHandler();
        } else {
            setStep(step => step + 1);
        }
        

    };

    const stepBackHandler = () => {
        setStep(step => step - 1);
    };
    
    const submitHandler = async () => {
        try {
            const updatedData = await sendPutRequest('https://localhost:7049/api/Company/UpdateCompany', form)
            console.log("Datos actualizados", updatedData);
        }catch(putRequestError){
            console.log("Error al actualizar datos", putRequestError);
        }
    }

    const companyDataComponent = form ? (
        <CompanyData stepForwardHandler={stepForwardHandler} form={form} />
    ) : null;

    return (

        <div>
            {(loading || loadingPutRequest) && <Spinner />}
            <form>

                {step === 1 && companyDataComponent}
                {step === 2 && <ContactData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} />}

            </form>

            {/* <div>
                {step === 2 ? <BasicButton buttonName={'Guardar'} buttonHandler={submitHandler}/> : null}
            </div> */}
            {putRequestError && <span>{putRequestError.message}</span>}
            {error && <span>{error.message}</span>}

        </div>
    )
}

export default CompanyForm
