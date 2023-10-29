import { useContext, useEffect, useState } from 'react'
import CompanyData from './CompanyData';
import ContactData from './ContactData';
import useGetBySomething from '../../../custom/useGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Shared/Modal/Modal';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';


const CompanyForm = () => {

    const [modal, setModal] = useState({
        modalOpen: false,
        modalTitle: "",
        modalMessage: "",
    });

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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
            setConfirmModalOpen(true);
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
        setConfirmModalOpen(false);
        try {
            const updatedData = await sendPutRequest('https://localhost:7049/api/Company/UpdateCompany', JSON.stringify(formToUpdate), 'application/json')
            setModal({
                modalOpen: true,
                modalTitle: "Aviso",
                modalMessage: "Datos actualizados correctamente.",
            });
            
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (putRequestError) {
            console.log("Error al actualizar datos", putRequestError);
            setModal({
                modalOpen: true,
                modalTitle: "Error",
                modalMessage: { putRequestError },
            });
        }
    }

    const companyDataComponent = form ? (
        <CompanyData stepForwardHandler={stepForwardHandler} form={form} setForm={setForm} />
    ) : null;

    return (

        <div className='company-forms'>
            {(loading || loadingPutRequest) && <Spinner />}

            <form>

                {step === 1 && companyDataComponent}
                {step === 2 && <ContactData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} setForm={setForm} />}

            </form>

            {error && <span>{error.message}</span>}

            {confirmModalOpen && (
                <ConfirmModal
                    title="Modificar datos"
                    message="¿Estás seguro de que deseas modificar sus datos?"
                    onConfirm={() => submitHandler(form)}
                    onCancel={() => setConfirmModalOpen(false)}
                />
            )}
            {modal.modalOpen && (
                <Modal
                    title={modal.modalTitle}
                    message={modal.modalMessage}
                    onClose={() => setModal({ modalOpen: false })}
                />
            )}
        </div>
    )
}

export default CompanyForm
