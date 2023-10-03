import { useContext, useEffect, useState } from 'react'
import FormPersonalData from './PersonalData/PersonalData';
import FormCareerData from './CareerData/CareerData';
import FormOtherData from './OtherData/OtherData';
import FormSkillsData from './SkillsData/SkillsData';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import useGetBySomething from '../../../custom/UseGetBySomething';
import usePutRequest from '../../../custom/usePutRequest';
import UserContext from '../../Context/UserContext/UserContext';
import Spinner from '../../Shared/Spinner/Spinner';

// const inicialForm = {
//     userName: 'clararazzetto',
//     name: 'clara',
//     lastname: 'razzetto',
//     email: 'clara@gmail.com',
//     legajo: '50600',
//     docType: '',
//     docNumber: '39580415',
//     birthdate: '',
//     civilStatus: '',
//     cuil: '20-39580415-4',
//     sex: '',
//     street: '',
//     streetNumber: '',
//     floor: '',
//     city: '',
//     province: '',
//     country: '',
//     telephone: '',
//     career: '',
//     approvedSubjects: '',
//     studyProgram: '',
//     currentCareerYear: '',
//     turn: '',
//     average: '',
//     averageWithFails: '',
//     careerTitle: '',
//     secondaryDegree: '',
//     curriculumVitae: '',
//     observations: '',
//     skills: [
//         {
//             skillId: 1,
//             skillLevel: 'Medio'
//         }
//     ],
// }

const StudentForm = () => {

    const { user } = useContext(UserContext);

    const url = 'https://localhost:7049/api/Student/GetStudent';

    const { data, loading, error } = useGetBySomething(url, user.id);
    
    const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();

    useEffect(() => {
        if (data) {
            setForm(data)
            console.log(data)
        }
    }, [data]);

    const [form, setForm] = useState('');

    const [step, setStep] = useState(2);

    const stepForwardHandler = (data) => {
        setForm((prevForm) => ({ ...prevForm, ...data }));
        if (step === 4) {
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
            const updatedData = await sendPutRequest('https://localhost:7049/api/Student/UpdateStudent', form)
            console.log("Datos actualizados", updatedData);
        } catch (putRequestError) {
            console.log("Error al actualizar datos", putRequestError);
        }
    }

    const PersonalDataComponent = form ? (
        <FormPersonalData stepForwardHandler={stepForwardHandler} form={form} setForm={setForm} />
    ) : null;


    return (

        <div>
            {(loading || loadingPutRequest) && <Spinner />}
            <form>

                {step === 1 && PersonalDataComponent }
                {step === 2 && <FormCareerData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} />}
                {step === 3 && <FormOtherData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler} form={form} />}
                {step === 4 && <FormSkillsData stepForwardHandler={stepForwardHandler} stepBackHandler={stepBackHandler}  form={form} />}

            </form>

            {/* <div>
                {step === 4 ? <BasicButton buttonName={'Guardar'} buttonHandler={submitHandler} /> : null}
            </div> */}

            {putRequestError && <span>{putRequestError.message}</span>}
            {error && <span>{error.message}</span>}

        </div>
    )
}

export default StudentForm
