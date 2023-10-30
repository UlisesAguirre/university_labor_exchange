import { useContext, useEffect, useState } from 'react'
import CompanyData from './CompanyData';
import ContactData from './ContactData';
import useGetBySomething from '../../../custom/UseGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Shared/Modal/Modal';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';
import Error from '../../Shared/Error/Error';


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

    const { sendPutRequest, loadingPutRequest } = usePutRequest();

    const [form, setForm] = useState('');

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data]);



    const stepForwardHandler = (data) => {
        setForm({ ...form, ...data });

        if (step === 2) {
            setConfirmModalOpen(true);
        } else {
            setStep(step => step + 1);
        }
    };

    const stepBackHandler = (data) => {
        setForm({ ...form, ...data });
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
        <>
            { error ?
                <Error error={error} />
                :
                <div>
                    {(loading || loadingPutRequest) && <Spinner />}
                    
                    <form>

                        {step === 1 && companyDataComponent}
                        {step === 2 && <ContactData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} setForm={setForm} />}

                    </form>

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
            }

        </>
    )
}

export default CompanyForm
