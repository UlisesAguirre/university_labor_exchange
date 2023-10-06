import { useContext, useEffect, useState } from 'react'
import CompanyData from './CompanyData';
import ContactData from './ContactData';
import useGetBySomething from '../../../custom/UseGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';
import BasicButton from '../../Shared/BasicButton/BasicButton';


const CompanyForm = () => {


    const { user } = useContext(UserContext);

    const url = 'https://localhost:7049/api/Company/GetCompany';

    const { data, loading, error } = useGetBySomething(url, user.id);

    const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();

    const [form, setForm] = useState('');

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data]);

    const deleteFormNulls = () => {
        Object.entries(form).forEach(([name, value]) => {
            if (value === null) {
                setForm({ ...form, [name]: '' })
            }
        })
        return form
    }

    //FIXME: VER SI ES NECESARIO PONERLO PORQUE CUANDO SE MANDA ME PARECE QUE NO SE SETTEA EN NULL
   

    const stepForwardHandler = (data) => {
        //FIXME: tarda en cargar el form entonces hay q apretar 2 veces para guardar la información y no se actualizar el data
        setForm({ ...form, ...data });

        if (step === 2) {
          
            // submitHandler(form);
        } else {
            setStep(step => step + 1);
        }

        // if (step !== 2) {         
        //     setStep(step => step + 1);    
        // }
    };

    const stepBackHandler = () => {
        setStep(step => step - 1);
    };

    const submitHandler = async () => {
        try {
            const updatedData = await sendPutRequest('https://localhost:7049/api/Company/UpdateCompany', form)
            console.log("Datos actualizados", updatedData);
        } catch (putRequestError) {
            console.log("Error al actualizar datos", putRequestError);
            alert("Error al cargar los datos")
        }
    }

    const companyDataComponent = form ? (
        <CompanyData stepForwardHandler={stepForwardHandler} form={deleteFormNulls()} setForm={setForm} />
    ) : null;

    return (

        <div>
            {(loading || loadingPutRequest) && <Spinner />}

            <form>

                {step === 1 && companyDataComponent}
                {step === 2 && <ContactData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} setForm={setForm} />}

            </form>

            <div>
                {step === 2 ? <BasicButton buttonName={'Enviar'} buttonHandler={submitHandler}/> : null}
            </div>

            {putRequestError && <span>{putRequestError.message}</span>}
            {error && <span>{error.message}</span>}

        </div>
    )
}

export default CompanyForm
