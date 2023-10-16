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

    }

    const blurHandler = (e) => {
        const { name } = e.target
        setErrors({
            ...errors,
            [name]: props.validateData(data, name),
        })
    };


    const moveForwardHandler = (e) => {
        e.preventDefault();

        let isValid = true;

        Object.keys(data).forEach((name) => {
            const error = props.validateData(data, name)

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

            props.stepForwardHandler(data);
        }

    }

    const moveBackHandler = (e) => {
        props.stepBackHandler()
    }

    return {
        data,
        errors,
        changeHandler,
        blurHandler,
        moveForwardHandler,
        moveBackHandler,
    }
}

export default useFrom
