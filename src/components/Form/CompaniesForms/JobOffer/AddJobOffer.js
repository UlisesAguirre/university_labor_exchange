import { addDays, format } from "date-fns";
import { useContext, useState } from "react"
import useGetRequest from "../../../../custom/useGetRequest"

import './addJobOffer.css'

import BasicButton from '../../../Shared/BasicButton/BasicButton'
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import usePostRequest from "../../../../custom/usePostRequest";
import Skills from "../../../Shared/Skills/Skills";

const validateForm = (form, name) => {
    let error = ''

    if (name === 'jobPositionCareer') {
        if (form[name].length <= 0) {
            error = "Este campo es obligatorio";
        }
    } else {
        if ((typeof form[name] === 'string' && !form[name].trim())) {
            if (validInputs[name].require) {
                error = "Este campo es obligatorio";
            }
        } else if (validInputs[name].regex) {
            if (!validInputs[name].regex.test(form[name])) {
                if (name === 'endDate' || name === 'tentativeStartDate') {
                    error = "La fecha debe tener formato dd/mm/yyyy"
                }
                if (name === 'numberOfPositionsToCover') {
                    error = "La cantidad de posiciones a cubrir debe ser mayor a 0 y menor a 2000"
                }
                if (name === 'jobTitle' || name === 'location' || name === 'positionToCover') {
                    error = "El campo solo debe aceptar caracteres del alfabeto español o ingles y tener una longitud máxima de 50 caracteres.";
                }
                if (name === 'jobDescription' || name === 'benefitsOfferedDetail') {
                    error = "El campo deben tener un límite máximo de 1500 caracteres."
                }
                if (name === 'internshipDuration') {
                    error = "El campo debe contener un número del 1 al 12";
                }
            }
            if (name === 'endDate' || name === 'tentativeStartDate') {
                const thirtydayslater = format(addDays(new Date(), 30), 'yyyy-MM-dd');
                if (form[name] <= thirtydayslater) {
                    error = `La fecha debe ser mayor o igual a 30 días desde la fecha actual`;
                }
            }
        }
    }

    return error
}

const validInputs = {
    endDate: { regex: /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/, require: true },
    numberOfPositionsToCover: { regex: /^(1\d{0,3}|[2-9]\d{0,2}|19\d{2})$/, require: true },
    jobPositionCareer: { require: true },
    jobType: { require: true },
    jobTitle: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
    jobDescription: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.,:\s]{1,1500}$/, require: true },
    benefitsOfferedDetail: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.,:\s]{1,1500}$/, require: true },
    location: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
    positionToCover: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
    internshipDuration: { regex: /^(1[0-2]|[2-9])$/, require: true },
    tentativeStartDate: { regex: /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/, require: true },
    workDay: { require: true },
    jobPositionSkill: { require: false },
    createdDate: { require: true },
}

const AddJobOffer = ({ setOption }) => {

    const { theme } = useContext(ThemeContext);

    const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Career/GetCareersForForms');
    const { postData, isLoading, postError } = usePostRequest()

    const careersList = getData;

    const inicialForm = {
        jobType: '',
        endDate: '',
        numberOfPositionsToCover: '',
        jobPositionCareer: new Array(),
        jobTitle: '',
        jobDescription: '',
        benefitsOfferedDetail: '',
        location: '',
        positionToCover: '',
        createdDate: format(new Date(), 'yyyy-MM-dd'),
        internshipDuration: '',
        tentativeStartDate: '',
        workDay: '',
        jobPositionSkill: new Array()
    }

    const [form, setForm] = useState(inicialForm)

    const [errors, setErrors] = useState({})

    const [visible, setVisible] = useState(false);

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value })
    };

    const changeCheckboxHandler = (e) => {
        const { checked, value } = e.target;
        const updatedCareers = checked
            ? [...form.jobPositionCareer, { idCareer: value }]
            : form.jobPositionCareer.filter((career) => career.idCareer !== value);
        setForm({ ...form, jobPositionCareer: updatedCareers });
    };

    const blurHandler = (e) => {
        const { name } = e.target
        setErrors({
            ...errors,
            [name]: validateForm(form, name),
        })
    };

    const goBackHandler = (e) => {
        e.preventDefault()
        setForm(inicialForm)
        setErrors({})
    }

    const checkboxBlurHandler = (e) => {
        e.preventDefault();
        setVisible(!visible);
        setErrors({
            ...errors,
            'jobPositionCareer': validateForm(form, 'jobPositionCareer'),
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        const fieldsToRemove = form.jobType === '0' ?
            ['workDay']
            :
            ['internshipDuration', 'tentativeStartDate']

        const filteredForm = Object.keys(form)
            .filter(key => !fieldsToRemove.includes(key))
            .reduce((object, key) => {
                object[key] = form[key];
                return object;
            }, {});

        Object.keys(filteredForm).forEach((name) => {

            const error = validateForm(form, name)

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }))

            if (error) {
                isValid = false;
            }

        });

        if (!isValid) {

            alert('Hay errores');

        } else {

            const response = await postData('https://localhost:7049/api/Company/AddJobPosition', filteredForm);
            console.log(response)
            if (response) {
                alert('Oferta laboral registrada correctamente');
                setForm(inicialForm);
            } else {
                alert('Error al registrar la Oferta laboral');
            }
        }

    }

    const goBackToMenu = (e) => {
        setOption('')
    }


    return (
        <div className="jobOffer-container">

            <h2>Ofertas Laborales</h2>

            {form.jobType ?
                <>
                    <form className={`jobOffer-form ${theme}`}>

                        <label>Titulo de la Oferta Laboral</label>
                        <input type="text" value={form.jobTitle} name='jobTitle' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.jobTitle && <div className="form-user-error-message">{errors.jobTitle}</div>}

                        <label>Posición a Cubrir</label>
                        <p>El nombre debe ser descriptivo de las tareas</p>
                        <input type="text" value={form.positionToCover} name='positionToCover' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.positionToCover && <div className="form-user-error-message">{errors.positionToCover}</div>}

                        <label>Cantidad de Puestos a Cubrir</label>
                        <input type="number" value={form.numberOfPositionsToCover}
                            name='numberOfPositionsToCover' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.numberOfPositionsToCover && <div className="form-user-error-message">{errors.numberOfPositionsToCover}</div>}


                        <label>Carreras Destino</label>
                        <p>Seleccione las carreras para las cuales esta destinada la busqueda laboral</p>
                        <div className="checkbox-container" onBlur={checkboxBlurHandler}>
                            {careersList && careersList.map((c, index) =>
                                <label className="btn-text">
                                    <input type="checkbox" name='jobPositionCareer' key={index} value={c.idCareer} onChange={changeCheckboxHandler} /> {c.name}
                                </label>
                            )}
                        </div>

                        {errors.jobPositionCareer && <div className="form-user-error-message">{errors.jobPositionCareer}</div>}

                        <label>Descripción</label>
                        <p>Se sugiere que se detalle lo siguiente: Descripción del puesto, requerímientos, días y horarios y toda la información que se estime conveniente</p>
                        <textarea value={form.jobDescription} name='jobDescription' onChange={changeHandler} onBlur={blurHandler} ></textarea>
                        {errors.jobDescription && <div className="form-user-error-message">{errors.jobDescription}</div>}

                        <label>Detalle de Beneficios Ofrecidos</label>
                        <p>Se sugiere que se detalle lo siguiente: remuneración, capacitación a recibir, obra social y toda la información que se estime conveniente </p>
                        <textarea value={form.benefitsOfferedDetail} name="benefitsOfferedDetail" onChange={changeHandler} onBlur={blurHandler}></textarea>
                        {errors.benefitsOfferedDetail && <div className="form-user-error-message">{errors.benefitsOfferedDetail}</div>}

                        <label>Lugar de Trabajo</label>
                        <p>Dirección y/o zona</p>
                        <input type="text" value={form.location} name='location' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.location && <div className="form-user-error-message">{errors.location}</div>}

                        {form.jobType === '0' ?
                            (<>

                                <label>Duración de la Pasantía</label>
                                <p>En meses - Por Ley Mínimo 2 meses - Maximo 12 meses</p>
                                <input type="number" min='2' max='12' value={form.internshipDuration} name='internshipDuration' onChange={changeHandler} onBlur={blurHandler} />
                                {errors.internshipDuration && <div className="form-user-error-message">{errors.internshipDuration}</div>}


                                <label>Fecha Tentativa de Inicio de la Pasantía</label>
                                <input type="date" value={form.tentativeStartDate} name='tentativeStartDate' onChange={changeHandler} onBlur={blurHandler} />
                                {errors.tentativeStartDate && <div className="form-user-error-message">{errors.tentativeStartDate}</div>}

                            </>)
                            :
                            (<>
                                <label>Jornada Laboral</label>
                                <select className='select' value={form.workDay} name="workDay" onChange={changeHandler} onBlur={blurHandler}>
                                    <option value=''>Seleccione tipo de jornada laboral</option>
                                    <option value={0}>Full time</option>
                                    <option value={1}>Part Time</option>
                                    <option value={2}>Freelance</option>
                                </select>
                                {errors.workDay && <div className="form-user-error-message">{errors.workDay}</div>}
                            </>)

                        }

                        <label>Fecha Finalización de la Oferta</label>
                        <input type="date" value={form.endDate} name='endDate' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.endDate && <div className="form-user-error-message">{errors.endDate}</div>}

                        <label>Habilidades esperadas</label>
                        <Skills form={form} setForm={setForm} />

                    </form>

                </>
                :
                <>
                    <form className={`jobOffer-form ${theme}`}>
                        <label>Tipo de búsqueda</label>
                        <select className='select' value={form.jobType} name='jobType' onChange={changeHandler} onBlur={blurHandler}>
                            <option value=''>Seleccione pasantía o en relación de dependencia</option>
                            <option value={0}>Pasantía</option>
                            <option value={1}>En relación de dependencia</option>
                        </select>
                        {errors.jobType && <div className="form-user-error-message">{errors.jobType}</div>}
                    </form>

                </>

            }
            <div className="save-button">
                {form.jobType && <BasicButton buttonName={'Atras'} buttonHandler={goBackHandler} />}
                <BasicButton buttonName={'Volver al menú'} buttonHandler={goBackToMenu} />
                {form.jobType && <BasicButton buttonName={'Guardar'} buttonHandler={submitHandler} />}
            </div>

        </div>

    )
}

export default AddJobOffer

