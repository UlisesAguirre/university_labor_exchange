import { addDays, format } from "date-fns";
import { useState } from "react"
import useGetRequest from "../../../../custom/useGetRequest"
import './jobOffer.css'

const validateForm = (form, name) => {
    let error = ''

    if ((typeof form[name] === 'string' && !form[name].trim())) {
        if (validInputs[name].require) {
            error = "Este campo es obligatorio";
        }
    } else {
        if (validInputs[name].regex) {
            if (!validInputs[name].regex.test(form[name])) {
                if (name === 'endDate' || name === 'tentativeStartDate') {
                    error = "La fecha debe tener formato dd/mm/yyyy"
                }
                if(name === 'numberOfPositionsToCover')
                {
                    error = "La cantidad de posiciones a cubrir debe ser mayor a 0 y menor a 2000"
                }
                if(name === 'jobTitle' || name === 'location' || name === 'positionToCover')
                {
                    error = "El campo solo debe aceptar caracteres del alfabeto español o ingles y tener una longitud máxima de 50 caracteres.";
                }
                if(name === 'jobDescription' || name === 'benefitsOfferedDetail'){
                    error = "El campo deben consistir únicamente en caracteres alfanuméricos y tener un límite máximo de 600 caracteres."
                }
                if(name === 'intershipDuration'){
                    error = "El campo debe contener un número del 1 al 12";
                }
            } 
            if (name === 'endDate' || name === 'tentativeStartDate') {
                const thirtydayslater = format(addDays(new Date(), 30),'yyyy-MM-dd') ;
                if(form[name] <= thirtydayslater){        
                    error = `La fecha debe ser mayor o igual a 30 días desde la fecha actual`;
                }
            }
           
        }

    }

    return error
}


const validInputs = {
    endDate: { regex: /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/, require: true },
    numberOfPositionsToCover: { regex: /^(1\d{0,3}|2000)$/, require: true },
    jobType: {require: true },
    idCarrera: { require: true },
    jobTitle: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/ , require: true },
    jobDescription:{ regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,600}$/  , require: true },
    benefitsOfferedDetail: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]{0,600}$/  , require: true },
    location: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/ , require: true },
    positionToCover: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/ , require: true },
    intershipDuration: { regex: /^(1[0-2]|[2-9])$/ , require: true },
    tentativeStartDate: { regex: /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/, require: true },
    workDay: { require: true },
}

const JobOffer = () => {

    const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Career/GetAllCareers');

    const careers = getData;

    const [form, setForm] = useState({
        endDate: '',
        numberOfPositionsToCover: '',
        jobType: '',
        idCarrera: [],
        jobTitle: '',
        jobDescription: '',
        benefitsOfferedDetail: '',
        location: '',
        positionToCover: '',
        createdDate: format(new Date(), 'yyyy-MM-dd'),
        intershipDuration: '',
        tentativeStartDate: '',
        workDay: '',
    })

    const [errors, setErrors] = useState({})


    const changeHandler = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value })
    };

    const blurHandler = (e) => {
        const { name } = e.target
        setErrors({
            ...errors,
            [name]: validateForm(form, name),
        })
    };


    const submitHandler = () => {

    }


    return (
        <div className="jobOffer-container">


            <label>Tipo de búsqueda</label>
            <select value={form.jobType} name='jobType' onChange={changeHandler} onBlur={blurHandler}>
                <option value=''>Seleccione pasantía o en relación de dependencia</option>
                <option value='Pasantía'>Pasantía</option>
                <option value='Trabajo'>En relación de dependencia</option>
            </select>
            {errors.jobType && <div className="form-user-error-message">{errors.jobType}</div>}

            {form.jobType &&

                <form className="jobOffer-form">
                    <label>Titulo de la Oferta Laboral</label>
                    <input type="text" value={form.jobTitle} name='jobTitle' onChange={changeHandler} onBlur={blurHandler} />
                    {errors.jobTitle && <div className="form-user-error-message">{errors.jobTitle}</div>}

                    <label>Posición a Cubrir</label>
                    <p>El nombre debe ser descriptivo de las tareas</p>
                    <input type="text" value={form.positionToCover} name='positionToCover' onChange={changeHandler} onBlur={blurHandler} />
                    {errors.positionToCover && <div>{errors.positionToCover}</div>}

                    <label>Cantidad de Puestos a Cubrir</label>
                    <input type="number" value={form.numberOfPositionsToCover} name='numberOfPositionsToCover' onChange={changeHandler} onBlur={blurHandler} />
                    {errors.numberOfPositionsToCover && <div>{errors.numberOfPositionsToCover}</div>}

                    <label>Carreras Destino</label>
                    <select multiple={true} value={form.idCarrera} name='idCarrera' onChange={changeHandler} onBlur={blurHandler}>
                        <option value=''>Seleccione las carreras que se adapten a la oferta laboral</option>
                        {careers.map((c) =>
                            <option key={c.idCarrer} value={c.idCarrer}>{c.name}</option>
                        )}
                    </select>
                    {errors.idCarrera && <div>{errors.idCarrera}</div>}

                    <label>Descripción</label>
                    <p>Se sugiere que se detalle lo siguiente: Descripción del puesto, requerímientos, días y horarios y toda la información que se estime conveniente</p>
                    <input type="text" value={form.jobDescription} name='jobDescription' onChange={changeHandler} onBlur={blurHandler} />
                    {errors.jobDescription && <div>{errors.jobDescription}</div>}

                    <label>Detalle de Beneficios Ofrecidos</label>
                    <p>Se sugiere que se detalle lo siguiente: remuneración, capacitación a recibir, obra social y toda la información que se estime conveniente </p>
                    <input type="text" value={form.benefitsOfferedDetail} name="benefitsOfferedDetail" onChange={changeHandler} onBlur={blurHandler} />
                    {errors.benefitsOfferedDetail && <div>{errors.benefitsOfferedDetail}</div>}

                    <label>Lugar de Trabajo</label>
                    <p>Dirección y/o zona</p>
                    <input type="text" value={form.location} name='location' onChange={changeHandler} onBlur={blurHandler} />
                    {errors.location && <div>{errors.location}</div>}

                    {form.jobType === 'Pasantía' ?
                        (<>
                            <label>Duración de la Pasantía</label>
                            <p>En meses - Por Ley Mínimo 2 meses - Maximo 12 meses</p>
                            <input type="number" min='2' max='12' value={form.intershipDuration} name='intershipDuration' onChange={changeHandler} onBlur={blurHandler} />
                            {errors.intershipDuration && <div>{errors.intershipDuration}</div>}

                            <label>Fecha Tentativa de Inicio</label>
                            <input type="date" value={form.tentativeStartDate} name='tentativeStartDate' onChange={changeHandler} onBlur={blurHandler} />
                            {errors.tentativeStartDate && <div>{errors.tentativeStartDate}</div>}
                        </>)
                        :
                        (<>
                            <label>Jornada Laboral</label>
                            <select value={form.workDay} name="workDay" onChange={changeHandler} onBlur={blurHandler}>
                                <option value=''>Seleccione pasantía o en relación de dependencia</option>
                                <option value='FullTime'>Full time</option>
                                <option value='PartTime'>Part Time</option>
                                <option value='Freelance'>Freelance</option>
                            </select>
                            {errors.workDay && <div>{errors.workDay}</div>}
                        </>)

                    }

                    <label>Fecha Finalización de la Oferta</label>
                    <input type="date" value={form.endDate} name='endDate' onChange={changeHandler} onBlur={blurHandler} />
                    {errors.endDate && <div>{errors.endDate}</div>}

                </form>
            }
        </div>
    )
}

export default JobOffer

