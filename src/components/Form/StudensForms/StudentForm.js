import { useContext, useEffect, useState } from 'react'
import FormPersonalData from './PersonalData/PersonalData';
import FormCareerData from './CareerData/CareerData';
import FormOtherData from './OtherData/OtherData';
import FormSkillsData from './SkillsData/SkillsData';
import useGetBySomething from '../../../custom/useGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';

import "./studentForm.css"
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';
import Modal from '../../Shared/Modal/Modal';
import Error from '../../Shared/Error/Error';

//FIXME: cuando agregemos el envio del token por header tengo que eliminar enviar el id al curriculum

const StudentForm = () => {

    const [modal, setModal] = useState({
        modalOpen: false,
        modalTitle: "",
        modalMessage: "",
    });

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const url = 'https://localhost:7049/api/Student/GetStudent';

    const { data, loading, error } = useGetBySomething(url, user.id);

    const { sendPutRequest, loadingPutRequest } = usePutRequest();

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data]);


    const [form, setForm] = useState('');

    const [step, setStep] = useState(1);

    const stepForwardHandler = (data) => {

        if (step === 4) {
            setForm((prevform) => ({ ...prevform, 'studentsSkills': data }));
            setConfirmModalOpen(true)
        } else {
            setForm((prevForm) => ({ ...prevForm, ...data }));
            setStep(step => step + 1);
        }

    };

    const stepBackHandler = (data) => {

        if (step === 4) {
            setForm((prevform) => ({ ...prevform, 'studentsSkills': data }));
        } else {
            setForm((prevForm) => ({ ...prevForm, ...data }));
        }
        setStep(step => step - 1);
    };

    const submitHandler = async (formToUpdate) => {
        setConfirmModalOpen(false);
        try {
            const updatedData = await sendPutRequest('https://localhost:7049/api/Student/UpdateStudent', JSON.stringify(formToUpdate), 'application/json')

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

    const PersonalDataComponent = form ? (
        <FormPersonalData stepForwardHandler={stepForwardHandler} form={form} setForm={setForm} />
    ) : null;


    return (
        <>
            { error ?
                <Error error={error} />
                :
                <>
                    <div className='studentForm-container'>
                        {(loading || loadingPutRequest) && <Spinner />}
                        <form>

                            {step === 1 && PersonalDataComponent}
                            {step === 2 && <FormCareerData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} />}
                            {step === 3 && <FormOtherData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} userId={user.id} />}
                            {step === 4 && <FormSkillsData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} />}

                        </form>

                        {confirmModalOpen && (
                            <ConfirmModal
                                title="Modificar datos"
                                message="¿Estás seguro de que deseas modificar sus datos?"
                                onConfirm={() => submitHandler(form)}
                                onCancel={() => setConfirmModalOpen(false)}
                            />
                        )}

                    </div>
                    {modal.modalOpen && (
                        <Modal
                            title={modal.modalTitle}
                            message={modal.modalMessage}
                            onClose={() => setModal({ modalOpen: false })}
                        />
                    )}
                </>
            }

        </>
    )
}

export default StudentForm
