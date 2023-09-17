import { useState } from "react"

//validateFrom es la funcion que hace las validaciones

const useFrom = ({ inicialForm, validateForm }) => {

    const[form, setForm] = useState(inicialForm);//valores iniciales del form
    const[errors, setErrors] = useState(inicialForm); //el objeto vacio representa que no hay errores
    const[loading, setLoading] = useState(false); //estado de envio del form
    const[response, setResponse] = useState(null); //respuesta obtenida al enviar el form

    const changeHandler = (e) => {
        const {value, name} = e.target;
        setForm({...form, [name]: value.toLowerCase() })
    };

    const blurHandler = (e) => {
        changeHandler(e);
        const {name} = e.target
        setErrors({
            ...errors,
            [name]: validateForm(form,name),
        })
    };


    const submitHandler = (e) => {
        e.preventDefault();
        //...
    };

    return {
        form,
        errors,
        loading,
        response,
        changeHandler,
        blurHandler,
        submitHandler,
    }
}

export default useFrom
