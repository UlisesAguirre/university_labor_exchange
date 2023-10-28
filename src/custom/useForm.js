import { useState } from "react"

const useFrom = (props) => {

    const [data, setData] = useState(props.inicialData); //valores iniciales del form
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { value, name } = e.target;
        if (value === '') {
            setData({ ...data, [name]: null });
        } else {
            setData({ ...data, [name]: value })
        }

        if(name === "careerSubscription") {
            setData({ ...data, [name]: e.target.checked });
        }

    }

    const blurHandler = (e) => {
        const { name } = e.target
        setErrors({
            ...errors,
            [name]: props.validateData(data[name], name),
        })
    };


    const moveForwardHandler = (e) => {
        e.preventDefault();

        let isValid = true;

        Object.keys(data).forEach((name) => {
            
            const error = props.validateData(data[name], name)

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }))

            if (error) {
                isValid = false;
            }
        });

        if(props.curriculum === false){
            setErrors(({...errors, 'curriculum': 'Debe cargar un curriculum .pdf'}))
            isValid = false;
        }

        if (!isValid) {

            alert('Hay errores');

        } else {

            props.stepForwardHandler(data);
        }

    }

    const moveBackHandler = (e) => {
        props.stepBackHandler()
    }

    return {
        data,
        errors,
        setErrors,
        changeHandler,
        blurHandler,
        moveForwardHandler,
        moveBackHandler,
    }
}

export default useFrom
