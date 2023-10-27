import { useContext, useEffect, useState } from 'react'
import CompanyData from './CompanyData';
import ContactData from './ContactData';
import useGetBySomething from '../../../custom/useGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import { useNavigate } from 'react-router-dom';


const CompanyForm = () => {

    const navigate = useNavigate();

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



    const stepForwardHandler = (data) => {
        //FIXME: tarda en cargar el form entonces hay q apretar 2 veces para guardar la información y no se actualizar el data
        setForm({ ...form, ...data });

        if (step === 2) {
            alert('Datos cargados con exito! Seleccione enviar')
            submitHandler({ ...form, ...data });
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

    const submitHandler = async (formToUpdate) => {
        try {
            const updatedData = await sendPutRequest('https://localhost:7049/api/Company/UpdateCompany', JSON.stringify(formToUpdate), 'application/json')
            console.log("Datos actualizados", updatedData);
            alert("Datos actualizados correctamente");
            navigate("/profile");
        } catch (putRequestError) {
            console.log("Error al actualizar datos", putRequestError);
            alert("Error al cargar los datos")
        }
    }

    const companyDataComponent = form ? (
        <CompanyData stepForwardHandler={stepForwardHandler} form={form} setForm={setForm} />
    ) : null;

    return (

        <div>
            {(loading || loadingPutRequest) && <Spinner />}

            <form>

                {step === 1 && companyDataComponent}
                {step === 2 && <ContactData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} setForm={setForm} />}

            </form>

            {putRequestError && <span>{putRequestError.message}</span>}
            {error && <span>{error.message}</span>}

        </div>
    )
}

export default CompanyForm
