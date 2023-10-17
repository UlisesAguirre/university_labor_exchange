import { addDays, format } from "date-fns";
import { useContext, useState } from "react"
import useGetRequest from "../../../../custom/useGetRequest"
import './jobOffer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import BasicButton from '../../../Shared/BasicButton/BasicButton'
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import usePostRequest from "../../../../custom/usePostRequest";

//FIXME: agregar skills

const validateForm = (form, name) => {
    let error = ''

    if (name === 'careers') {
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
                if (name === 'intershipDuration') {
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
    careers: { require: true },
    jobType: { require: true },
    jobTitle: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
    jobDescription: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.,\s]{1,1500}$/, require: true },
    benefitsOfferedDetail: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.,\s]{1,1500}$/, require: true },
    location: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
    positionToCover: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/, require: true },
    intershipDuration: { regex: /^(1[0-2]|[2-9])$/, require: true },
    tentativeStartDate: { regex: /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/, require: true },
    workDay: { require: true },
}

const JobOffer = () => {

    const { theme } = useContext(ThemeContext);

    const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Career/GetAllCareers');
    const { postData, isLoading, postError } = usePostRequest()

    const careersList = getData;

    // const careersList = [
    //     { idCarrer: 1, name: 'Ingeniería química' },
    //     { idCarrer: 2, name: 'Ingeniería química 2' },
    //     { idCarrer: 3, name: 'Ingeniería química 3' },
    // ]

    const [careers, setCareers] = useState([]);
    const [visible, setVisible] = useState(false);

    const inicialForm = {
        jobType: '',
        endDate: '',
        numberOfPositionsToCover: '',
        careers: [],
        jobTitle: '',
        jobDescription: '',
        benefitsOfferedDetail: '',
        location: '',
        positionToCover: '',
        createdDate: format(new Date(), 'yyyy-MM-dd'),
        intershipDuration: '',
        tentativeStartDate: '',
        workDay: '',
    }

    const [form, setForm] = useState(inicialForm)

    const [errors, setErrors] = useState({})


    const changeHandler = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value })
    };

    const changeCheckboxHandler = (e) => {
        const { value } = e.target
        if (careers.some((career) => career.idCarrer === value)) {
            // Si ya existe en el array, lo eliminamos
            setCareers((prevCareers) => prevCareers.filter((career) => career.idCarrer !== value));
        } else {
            // Si no existe en el array, lo agregamos como un objeto
            setCareers((prevCareers) => [...prevCareers, { idCarrer: value }]);
        }
        setForm({ ...form, careers: careers })
    };


    const blurHandler = (e) => {
        const { name } = e.target
        setErrors({
            ...errors,
            [name]: validateForm(form, name),
        })
    };


    const saveHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        setForm({
            ...form,
            careers: careers,
        })

        let fieldsToKeep = [];

        if (form.jobType === 'Pasantia') {
            fieldsToKeep = ['jobType', 'endDate', 'numberOfPositionsToCover', 'careers', 'jobTitle', 'jobDescription',
                'benefitsOfferedDetail', 'location', 'positionToCover', 'intershipDuration', 'tentativeStartDate ']

        } else {
            fieldsToKeep = ['jobType', 'endDate', 'numberOfPositionsToCover', 'careers', 'jobTitle', 'jobDescription',
                'benefitsOfferedDetail', 'location', 'positionToCover', ' workDay']

        }

        const filteredForm = Object.keys(form)
            .filter((key) => fieldsToKeep.includes(key))
            .reduce((obj, key) => {
                obj[key] = form[key];
                return obj;
            }, {});

        Object.keys(filteredForm).forEach((name) => {

            let error = validateForm(filteredForm, name)

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

            submitHandler();

        }

    }

    const submitHandler = (e) => {
        e.preventDefault()

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
                        <input type="number" value={form.numberOfPositionsToCover} name='numberOfPositionsToCover' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.numberOfPositionsToCover && <div className="form-user-error-message">{errors.numberOfPositionsToCover}</div>}


                        <label>Carreras Destino</label>
                        <div className="select-container">
                            <div className="select-btn" onClick={(e) => { setVisible(visible ? false : true) }}>
                                <span className="btn-text">Seleccione las carreras destino para curbrir su puesto de trabajo</span>
                                <span className="btn-text"><FontAwesomeIcon icon={faChevronDown} /></span>
                            </div>
                        </div>
                        {visible &&
                            <div className="checkbox-container">
                                {careersList && careersList.map((c) =>
                                    <label className="btn-text">
                                        <input type="checkbox" name='careers' key={c.idCarrer} value={c.idCarrer} onChange={changeCheckboxHandler} /> {c.name}
                                    </label>
                                )}
                            </div>
                        }
                        {errors.careers && <div className="form-user-error-message">{errors.careers}</div>}

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

                        {form.jobType === 'Pasantía' ?
                            (<>
                                <label>Duración de la Pasantía</label>
                                <p>En meses - Por Ley Mínimo 2 meses - Maximo 12 meses</p>
                                <input type="number" min='2' max='12' value={form.intershipDuration} name='intershipDuration' onChange={changeHandler} onBlur={blurHandler} />
                                {errors.intershipDuration && <div className="form-user-error-message">{errors.intershipDuration}</div>}

                                <label>Fecha Tentativa de Inicio de la Pasantía</label>
                                <input type="date" value={form.tentativeStartDate} name='tentativeStartDate' onChange={changeHandler} onBlur={blurHandler} />
                                {errors.tentativeStartDate && <div className="form-user-error-message">{errors.tentativeStartDate}</div>}
                            </>)
                            :
                            (<>
                                <label>Jornada Laboral</label>
                                <select className='select' value={form.workDay} name="workDay" onChange={changeHandler} onBlur={blurHandler}>
                                    <option value=''>Seleccione pasantía o en relación de dependencia</option>
                                    <option value='FullTime'>Full time</option>
                                    <option value='PartTime'>Part Time</option>
                                    <option value='Freelance'>Freelance</option>
                                </select>
                                {errors.workDay && <div className="form-user-error-message">{errors.workDay}</div>}
                            </>)

                        }

                        <label>Fecha Finalización de la Oferta</label>
                        <input type="date" value={form.endDate} name='endDate' onChange={changeHandler} onBlur={blurHandler} />
                        {errors.endDate && <div className="form-user-error-message">{errors.endDate}</div>}

                    </form>

                    <div className="save-button">
                        <BasicButton buttonName={'Atras'} buttonHandler={(e) => { setForm({ inicialForm }) }} />
                        <BasicButton buttonName={'Guardar'} buttonHandler={saveHandler} />
                    </div>

                </>
                :
                <>
                    <form className={`jobOffer-form ${theme}`}>
                        <label>Tipo de búsqueda</label>
                        <select className='select' value={form.jobType} name='jobType' onChange={changeHandler} onBlur={blurHandler}>
                            <option value=''>Seleccione pasantía o en relación de dependencia</option>
                            <option value='Pasantía'>Pasantía</option>
                            <option value='Trabajo'>En relación de dependencia</option>
                        </select>
                        {errors.jobType && <div className="form-user-error-message">{errors.jobType}</div>}
                    </form>

                </>

            }

        </div>

    )
}

export default JobOffer

